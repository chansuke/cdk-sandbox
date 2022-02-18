import { Template } from 'aws-cdk-lib/assertions';
import * as cdk from 'aws-cdk-lib';
import * as ActiveTimer from '../lib/cdk-sample-stack';

test('Context', () => {
  const app = new cdk.App({
    context: {
      systemName: 'starwars',
      envType: 'prd',
    },
  });
  const stack = new ActiveTimer.CdkSampleStack(app, 'DevioStack');

  // Prepare the stack for assertions.
  // https://docs.aws.amazon.com/ja_jp/cdk/v2/guide/testing.html
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::EC2::VPC', {
    Tags: [{ Key: 'Name', Value: 'starwars-prd-vpc' }],
  });
});
