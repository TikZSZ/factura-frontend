import { useStore } from '@/store';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

export default function(){
  const router = useRouter()

  const submitData = reactive({
    userAccountId:'',
    privateKey:''
  })

  const submit = async () => {
    await useStore().submitLogin({accountId:submitData.userAccountId,privateKey:submitData.privateKey},router);
    submitData.userAccountId = "";
    submitData.privateKey = ""
  }
  return {submitData,submit}
}