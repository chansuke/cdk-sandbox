import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Vpc } from './resource/vpc';
import { Subnet } from './resource/subnet';
import { InternetGateway } from './resource/internet-gateway';
import { ElasticIp } from './resource/elascic-ip';
import { NatGateway } from './resource/nat-gateway';
import { RouteTable } from './resource/route-table';

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

    // Internet Gateway
    const internetGateway = new InternetGateway(vpc.vpc);
    internetGateway.createResources(this);

    // Elastic IP
    const elasticIp = new ElasticIp();
    elasticIp.createResources(this);

    // NAT Gateway
    const natGateway = new NatGateway(
      subnet.public1a,
      subnet.public1c,
      elasticIp.ngw1a,
      elasticIp.ngw1c
    );
    natGateway.createResources(this);

    // Route Table
    const routeTable = new RouteTable(
      vpc.vpc,
      subnet.public1a,
      subnet.public1c,
      subnet.app1a,
      subnet.app1c,
      subnet.db1a,
      subnet.db1c,
      internetGateway.igw,
      natGateway.ngw1a,
      natGateway.ngw1c
    );
    routeTable.createResources(this);
  }
}
