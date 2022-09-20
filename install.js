require('./xrpld-hooks/hook-api-examples/utils-tests.js')
  .TestRig('wss://hooks-testnet-v2.xrpl-labs.com').then(t =>
    {
      let wasm = t.findWasm()
      if (wasm.length != 1) {
        console.log('There should be exactly one .wasm file in the current working directory.')
        process.exit(1)
      }

      const secret  = process.argv[2]
      const account = t.xrpljs.Wallet.fromSeed(secret)

      t.api.submit({
        Account: account.classicAddress,
        TransactionType: 'SetHook',
        Hooks: [
          {
            Hook: {
              CreateCode: t.wasm(wasm[0]),
              HookApiVersion: 0,
              HookNamespace: 'CAFECAFECAFECAFECAFECAFECAFECAFECAFECAFECAFECAFECAFECAFECAFECAFE',
              HookOn: '0000000000000000',
              Flags: t.hsfOVERRIDE
            }
          }
        ],
        Fee: '1000000'
      }, {
        wallet: account
      }).then(x => {
          t.assertTxnSuccess(x)
          console.log(x)
          process.exit(0)
      }).catch(e => console.log('e2', e))
    })
    .catch(e => console.log('e1', e))
