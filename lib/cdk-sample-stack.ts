import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Vpc } from './resource/vpc';
import { Subnet } from './resource/subnet';

import { AwsParam } from './param';

export interface CdkSampleStackProps extends StackProps {
  aws: AwsParam;
}

export class CdkSampleStack extends Stack {
  // 第一: リソースを定義するConstructを定義
  // 第二: リソースの論理ID(CFn コンソールにも表示)
  // 第三: https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-ec2.CfnVPCProps.html
  constructor(scope: Construct, id: string, props?: CdkSampleStackProps) {
    super(scope, id, props);

    // Vpc
    const vpc = new Vpc();
    vpc.createResources(this);

    // Subnet
    const subnet = new Subnet(vpc.vpc);
    subnet.createResources(this);
  }
}
