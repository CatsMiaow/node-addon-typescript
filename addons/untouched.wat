(module
 (type $i32_=>_i32 (func_subtype (param i32) (result i32) func))
 (global $~lib/memory/__data_end i32 (i32.const 8))
 (global $~lib/memory/__stack_pointer (mut i32) (i32.const 32776))
 (global $~lib/memory/__heap_base i32 (i32.const 32776))
 (memory $0 0)
 (table $0 1 1 funcref)
 (elem $0 (i32.const 1))
 (export "loop" (func $assembly/index/loop))
 (export "memory" (memory $0))
 (func $assembly/index/loop (type $i32_=>_i32) (param $size i32) (result i32)
  (local $count i32)
  (local $i i32)
  i32.const 0
  local.set $count
  i32.const 0
  local.set $i
  loop $for-loop|0
   local.get $i
   local.get $size
   i32.lt_s
   if
    local.get $count
    i32.const 1
    i32.add
    local.set $count
    local.get $i
    i32.const 1
    i32.add
    local.set $i
    br $for-loop|0
   end
  end
  local.get $count
  return
 )
)
