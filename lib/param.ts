// 実行時に必要な値。
export interface AwsParam {
  keyId: string;
  secret: string;
  region: string;
  account: string;
}

// Paramを環境変数から取得する。
// 一つでも設定されていない値がある場合はエラーを発生させる。
export function paramFromEnv(): AwsParam {
  const isEmpty = function (env: string | undefined): boolean {
    return env === undefined || env.length == 0;
  };

  const param = {
    keyId: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    account: process.env.AWS_ACCOUNT,
  };

  if (isEmpty(param.keyId)) {
    throw new Error('environment variable AWS_ACCESS_KEY_ID required');
  }
  if (isEmpty(param.secret)) {
    throw new Error('environment variable AWS_SECRET_ACCESS_KEY required');
  }
  if (isEmpty(param.region)) {
    throw new Error('environment variable AWS_REGION required');
  }
  if (isEmpty(param.account)) {
    throw new Error('environment variable AWS_ACCOUNT required');
  }

  return {
    keyId: param.keyId!,
    secret: param.secret!,
    region: param.region!,
    account: param.account!,
  };
}
