import { AcErrorCode } from '../common/ac-error-code';

export interface ResponseWrapper {
  data: any;
  success: boolean;
  errorCode: AcErrorCode;
  error: string;
}
