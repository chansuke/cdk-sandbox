import { Template } from 'aws-cdk-lib/assertions';
import * as cdk from 'aws-cdk-lib';
import * as ActiveTimer from '../../lib/cdk-sample-stack';

describe('testing Subnet', () => {
  test('check resources', () => {
    const app = new cdk.App();

    const stack = new ActiveTimer.CdkSampleStack(app, 'ActiveTimerStack');

    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::EC2::EIP', 2);
    template.hasResourceProperties('AWS::EC2::EIP', {
      Domain: 'vpc',
      Tags: [{ Key: 'Name', Value: 'undefined-undefined-eip-ngw-1a' }],
    });
    template.hasResourceProperties('AWS::EC2::EIP', {
      Domain: 'vpc',
      Tags: [{ Key: 'Name', Value: 'undefined-undefined-eip-ngw-1c' }],
    });
  });
});
