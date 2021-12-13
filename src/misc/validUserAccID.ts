import { required, minLength, } from "@vuelidate/validators";
import { helpers } from "@vuelidate/validators";

const regex = helpers.regex(/[0-9]+.[0-9]+.[0-9]+/);
const isAccountId = helpers.withMessage('Account Id should be of the form 00.00.0000',regex)

export const validAccountId = {
 required:helpers.withMessage('Account ID is required',required),
 isAccountId:isAccountId
}