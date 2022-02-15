import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

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

    const systemName = this.node.tryGetContext('systemName');
    const envType = this.node.tryGetContext('envType');

    const vpc = new ec2.CfnVPC(this, 'MyVPC', {
      cidrBlock: '10.0.0.0/16',
      tags: [{ key: 'Name', value: `${systemName}-${envType}-vpc` }],
    });

    const subnetPublic1a = new ec2.CfnSubnet(this, 'SubnetPublic1a', {
      cidrBlock: '10.0.11.0/24',
      vpcId: vpc.ref,
      availabilityZone: 'ap-northeast-1a',
      tags: [{ key: 'Name', value: `${systemName}-${envType}-subnet-public-1a` }]
    })
    const subnetPublic1c = new ec2.CfnSubnet(this, 'SubnetPublic1c', {
      cidrBlock: '10.0.12.0/24',
      vpcId: vpc.ref,
      availabilityZone: 'ap-northeast-1c',
      tags: [{ key: 'Name', value: `${systemName}-${envType}-subnet-public-1c` }]
    })
    const subnetApp1a = new ec2.CfnSubnet(this, 'SubnetApp1a', {
      cidrBlock: '10.0.21.0/24',
      vpcId: vpc.ref,
      availabilityZone: 'ap-northeast-1a',
      tags: [{ key: 'Name', value: `${systemName}-${envType}-subnet-app-1a` }]
    })
    const subnetApp1c = new ec2.CfnSubnet(this, 'SubnetApp1c', {
      cidrBlock: '10.0.22.0/24',
      vpcId: vpc.ref,
      availabilityZone: 'ap-northeast-1c',
      tags: [{ key: 'Name', value: `${systemName}-${envType}-subnet-app-1c` }]
    })
    const subnetDb1a = new ec2.CfnSubnet(this, 'SubnetDb1a', {
      cidrBlock: '10.0.31.0/24',
      vpcId: vpc.ref,
      availabilityZone: 'ap-northeast-1a',
      tags: [{ key: 'Name', value: `${systemName}-${envType}-subnet-db-1a` }]
    })
    const subnetDb1c = new ec2.CfnSubnet(this, 'SubnetDb1c', {
      cidrBlock: '10.0.32.0/24',
      vpcId: vpc.ref,
      availabilityZone: 'ap-northeast-1c',
      tags: [{ key: 'Name', value: `${systemName}-${envType}-subnet-db-1c` }]
    })
  }
}
