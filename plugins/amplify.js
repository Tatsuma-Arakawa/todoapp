import Vue from 'vue'
import Amplify, * as AmplifyModules from 'aws-amplify'
import '@aws-amplify/ui-vue'
import awsExports from '@/src/aws-exports'

Amplify.configure(awsExports)
Vue.use(Amplify, AmplifyModules)