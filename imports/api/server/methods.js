import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import md5 from 'blueimp-md5';

Meteor.methods({
  generateVcode: function ({ orderId, amount }) {
    // generate the vcode
    const merchantId = 'test7670',
    // const merchantId = 'metrolimo_Dev',
    // verifyKey = '05126d8196cbe7fb7d988c8bd4ce8249';
          verifyKey = '1942be326a223c849e64149d2493ffec';

    let vcode = md5(amount + merchantId + orderId + verifyKey);

    return {
      vcode: vcode,
      merchantId: merchantId
    };
  }
});
