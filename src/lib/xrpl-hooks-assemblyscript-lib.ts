@external("env", "_g")
export declare function GUARD(id: i32, maxiter: i32): i32

@external("env", "accept")
export declare function ACCEPT(read_ptr: string, read_len: i32, err: i64): i64

@external("env", "trace")
export declare function TRACE(mread_ptr: string = '', mread_len: i32 = 0, dread_ptr: string = '', dread_len: i32 = 0, as_hex: i32 = 0): i64

@external("env", "trace_num")
export declare function TRACE_NUM(mread_ptr: string = '', mread_len: i32 = 0, num: i64 = 0): i64

////////////////////

export function LOG (text: string, num?: i64): void {
  // TRACE(text, text.length * 2, text, text.length * 2, 0)
  if (num) {
    TRACE_NUM(text, text.length * 2, num)
  } else {
    TRACE('', 0, text, text.length * 2, 0)
  }
}

export function OK (text: string = 'OK'): void {
  ACCEPT(text, text.length * 2, 0)
}
