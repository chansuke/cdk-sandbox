import { Template  } from "aws-cdk-lib/assertions";
import * as cdk from "aws-cdk-lib";
import * as ActiveTimer from '../lib/cdk-sample-stack';

describe('testing VPC', () => {
  test('vpc resource check', () => {
    const app = new cdk.App();


    const stack = new ActiveTimer.CdkSampleStack(app, 'ActiveTimerStack');

    // Prepare the stack for assertions.
    // https://docs.aws.amazon.com/ja_jp/cdk/v2/guide/testing.html
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::EC2::VPC', {
      CidrBlock: '10.0.0.0/16',
      Tags: [{ 'Key': 'Name', 'Value': 'activetimer-stg-vpc' }]
    })
    template.resourceCountIs('AWS::EC2::VPC', 1);
  })
})
