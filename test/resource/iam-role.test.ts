import { Template, Match } from 'aws-cdk-lib/assertions';
import * as cdk from 'aws-cdk-lib';
import * as ActiveTimer from '../../lib/cdk-sample-stack';

describe('testing IamRole', () => {
  test('check resources', () => {
    const app = new cdk.App();

    const stack = new ActiveTimer.CdkSampleStack(app, 'ActiveTimerStack');

    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::IAM::Role', 2);
    template.hasResourceProperties('AWS::IAM::Role', {
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              Service: Match.anyValue(),
            },
            Action: 'sts:AssumeRole',
          },
        ],
      },
      ManagedPolicyArns: ['arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore'],
      RoleName: 'undefined-undefined-role-ec2',
    });
    template.hasResourceProperties('AWS::IAM::Role', {
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              Service: 'monitoring.rds.amazonaws.com',
            },
            Action: 'sts:AssumeRole',
          },
        ],
      },
      ManagedPolicyArns: ['arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole'],
      RoleName: 'undefined-undefined-role-rds',
    });

    template.resourceCountIs('AWS::IAM::InstanceProfile', 1);
    template.hasResourceProperties('AWS::IAM::InstanceProfile', {
      Roles: Match.anyValue(),
      InstanceProfileName: 'undefined-undefined-role-ec2',
    });
  });
});
