import { Template, Match } from 'aws-cdk-lib/assertions';
import * as cdk from 'aws-cdk-lib';
import * as ActiveTimer from '../../lib/cdk-sample-stack';


describe('testing Route Table', () => {
  test('check resources', () => {
    const app = new cdk.App();

    const stack = new ActiveTimer.CdkSampleStack(app, 'ActiveTimerStack');

    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::EC2::RouteTable', 4);
    template.hasResourceProperties('AWS::EC2::RouteTable', {
        VpcId: Match.anyValue(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-rtb-public' }]
    });
    template.hasResourceProperties('AWS::EC2::RouteTable', {
        VpcId: Match.anyValue(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-rtb-app-1a' }]
    });
    template.hasResourceProperties('AWS::EC2::RouteTable', {
        VpcId: Match.anyValue(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-rtb-app-1c' }]
    });
    template.hasResourceProperties('AWS::EC2::RouteTable', {
        VpcId: Match.anyValue(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-rtb-db' }]
    });


    template.resourceCountIs('AWS::EC2::RouteTable', 4);
    template.hasResourceProperties('AWS::EC2::Route', {
        RouteTableId: Match.anyValue(),
        DestinationCidrBlock: '0.0.0.0/0',
        GatewayId: Match.anyValue()
    });
    template.hasResourceProperties('AWS::EC2::Route', {
        RouteTableId: Match.anyValue(),
        DestinationCidrBlock: '0.0.0.0/0',
        GatewayId: Match.anyValue()
    });

    template.resourceCountIs('AWS::EC2::SubnetRouteTableAssociation', 6);
    template.hasResourceProperties('AWS::EC2::SubnetRouteTableAssociation', {
        RouteTableId: Match.anyValue(),
        SubnetId: Match.anyValue()
    });
  });
});
