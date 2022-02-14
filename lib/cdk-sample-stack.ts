import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

import { AwsParam } from './param';

export interface CdkSampleStackProps extends StackProps {
  aws: AwsParam,
}

export class CdkSampleStack extends Stack {
  // 第一: リソースを定義するConstructを定義
  // 第二: リソースの論理ID(CFn コンソールにも表示)
  // 第三: https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-ec2.CfnVPCProps.html
  constructor(scope: Construct, id: string, props?: CdkSampleStackProps) {
    super(scope, id, props);

    const systemName = this.node.tryGetContext('systemName');
    const envType = this.node.tryGetContext('envType');

    new ec2.CfnVPC(this, 'MyVPC', {
      cidrBlock: '10.0.0.0/16',
      tags: [{ key: 'Name', value: `${systemName}-${envType}-vpc` }]
    });
  }
}
