/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// RUN: %hermesc -Xenable-tdz -O0 -dump-ir %s | %FileCheckOrRegen --match-full-lines %s
// RUN: %hermesc -Xenable-tdz -custom-opt=typeinference -custom-opt=tdzdedup -dump-ir %s | %FileCheckOrRegen --match-full-lines --check-prefix=CHKOPT %s

function check_after_store(p) {
    function inner1() {
        x = 10;
        if (p)
            return x;
        return 0;
    }
    let x;
    return inner;
}

function check_after_check() {
    function inner2(p) {
        ++x;
        if (p)
            ++x;
        return x;
    }
    let x = 0;
    return inner;
}

// Auto-generated content below. Please do not modify manually.

// CHECK:function global(): any
// CHECK-NEXT:frame = []
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = DeclareGlobalVarInst "check_after_store": string
// CHECK-NEXT:  %1 = DeclareGlobalVarInst "check_after_check": string
// CHECK-NEXT:  %2 = CreateFunctionInst (:closure) %check_after_store(): any
// CHECK-NEXT:  %3 = StorePropertyLooseInst %2: closure, globalObject: object, "check_after_store": string
// CHECK-NEXT:  %4 = CreateFunctionInst (:closure) %check_after_check(): any
// CHECK-NEXT:  %5 = StorePropertyLooseInst %4: closure, globalObject: object, "check_after_check": string
// CHECK-NEXT:  %6 = AllocStackInst (:any) $?anon_0_ret: any
// CHECK-NEXT:  %7 = StoreStackInst undefined: undefined, %6: any
// CHECK-NEXT:  %8 = LoadStackInst (:any) %6: any
// CHECK-NEXT:  %9 = ReturnInst %8: any
// CHECK-NEXT:function_end

// CHECK:function check_after_store(p: any): any
// CHECK-NEXT:frame = [p: any, inner1: any, x: any|empty]
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = LoadParamInst (:any) %p: any
// CHECK-NEXT:  %1 = StoreFrameInst %0: any, [p]: any
// CHECK-NEXT:  %2 = StoreFrameInst empty: empty, [x]: any|empty
// CHECK-NEXT:  %3 = CreateFunctionInst (:closure) %inner1(): any
// CHECK-NEXT:  %4 = StoreFrameInst %3: closure, [inner1]: any
// CHECK-NEXT:  %5 = StoreFrameInst undefined: undefined, [x]: any|empty
// CHECK-NEXT:  %6 = TryLoadGlobalPropertyInst (:any) globalObject: object, "inner": string
// CHECK-NEXT:  %7 = ReturnInst %6: any
// CHECK-NEXT:%BB1:
// CHECK-NEXT:  %8 = ReturnInst undefined: undefined
// CHECK-NEXT:function_end

// CHECK:function check_after_check(): any
// CHECK-NEXT:frame = [inner2: any, x: any|empty]
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = StoreFrameInst empty: empty, [x]: any|empty
// CHECK-NEXT:  %1 = CreateFunctionInst (:closure) %inner2(): any
// CHECK-NEXT:  %2 = StoreFrameInst %1: closure, [inner2]: any
// CHECK-NEXT:  %3 = StoreFrameInst 0: number, [x]: any|empty
// CHECK-NEXT:  %4 = TryLoadGlobalPropertyInst (:any) globalObject: object, "inner": string
// CHECK-NEXT:  %5 = ReturnInst %4: any
// CHECK-NEXT:%BB1:
// CHECK-NEXT:  %6 = ReturnInst undefined: undefined
// CHECK-NEXT:function_end

// CHECK:function inner1(): any
// CHECK-NEXT:frame = []
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = LoadFrameInst (:any|empty) [x@check_after_store]: any|empty
// CHECK-NEXT:  %1 = ThrowIfEmptyInst (:any) %0: any|empty
// CHECK-NEXT:  %2 = StoreFrameInst 10: number, [x@check_after_store]: any|empty
// CHECK-NEXT:  %3 = LoadFrameInst (:any) [p@check_after_store]: any
// CHECK-NEXT:  %4 = CondBranchInst %3: any, %BB1, %BB2
// CHECK-NEXT:%BB1:
// CHECK-NEXT:  %5 = LoadFrameInst (:any|empty) [x@check_after_store]: any|empty
// CHECK-NEXT:  %6 = ThrowIfEmptyInst (:any) %5: any|empty
// CHECK-NEXT:  %7 = ReturnInst %6: any
// CHECK-NEXT:%BB2:
// CHECK-NEXT:  %8 = BranchInst %BB3
// CHECK-NEXT:%BB3:
// CHECK-NEXT:  %9 = ReturnInst 0: number
// CHECK-NEXT:%BB4:
// CHECK-NEXT:  %10 = BranchInst %BB3
// CHECK-NEXT:%BB5:
// CHECK-NEXT:  %11 = ReturnInst undefined: undefined
// CHECK-NEXT:function_end

// CHECK:function inner2(p: any): any
// CHECK-NEXT:frame = [p: any]
// CHECK-NEXT:%BB0:
// CHECK-NEXT:  %0 = LoadParamInst (:any) %p: any
// CHECK-NEXT:  %1 = StoreFrameInst %0: any, [p]: any
// CHECK-NEXT:  %2 = LoadFrameInst (:any|empty) [x@check_after_check]: any|empty
// CHECK-NEXT:  %3 = ThrowIfEmptyInst (:any) %2: any|empty
// CHECK-NEXT:  %4 = UnaryIncInst (:any) %3: any
// CHECK-NEXT:  %5 = LoadFrameInst (:any|empty) [x@check_after_check]: any|empty
// CHECK-NEXT:  %6 = ThrowIfEmptyInst (:any) %5: any|empty
// CHECK-NEXT:  %7 = StoreFrameInst %4: any, [x@check_after_check]: any|empty
// CHECK-NEXT:  %8 = LoadFrameInst (:any) [p]: any
// CHECK-NEXT:  %9 = CondBranchInst %8: any, %BB1, %BB2
// CHECK-NEXT:%BB1:
// CHECK-NEXT:  %10 = LoadFrameInst (:any|empty) [x@check_after_check]: any|empty
// CHECK-NEXT:  %11 = ThrowIfEmptyInst (:any) %10: any|empty
// CHECK-NEXT:  %12 = UnaryIncInst (:any) %11: any
// CHECK-NEXT:  %13 = LoadFrameInst (:any|empty) [x@check_after_check]: any|empty
// CHECK-NEXT:  %14 = ThrowIfEmptyInst (:any) %13: any|empty
// CHECK-NEXT:  %15 = StoreFrameInst %12: any, [x@check_after_check]: any|empty
// CHECK-NEXT:  %16 = BranchInst %BB3
// CHECK-NEXT:%BB2:
// CHECK-NEXT:  %17 = BranchInst %BB3
// CHECK-NEXT:%BB3:
// CHECK-NEXT:  %18 = LoadFrameInst (:any|empty) [x@check_after_check]: any|empty
// CHECK-NEXT:  %19 = ThrowIfEmptyInst (:any) %18: any|empty
// CHECK-NEXT:  %20 = ReturnInst %19: any
// CHECK-NEXT:%BB4:
// CHECK-NEXT:  %21 = ReturnInst undefined: undefined
// CHECK-NEXT:function_end

// CHKOPT:function global(): undefined
// CHKOPT-NEXT:frame = []
// CHKOPT-NEXT:%BB0:
// CHKOPT-NEXT:  %0 = DeclareGlobalVarInst "check_after_store": string
// CHKOPT-NEXT:  %1 = DeclareGlobalVarInst "check_after_check": string
// CHKOPT-NEXT:  %2 = CreateFunctionInst (:closure) %check_after_store(): any
// CHKOPT-NEXT:  %3 = StorePropertyLooseInst %2: closure, globalObject: object, "check_after_store": string
// CHKOPT-NEXT:  %4 = CreateFunctionInst (:closure) %check_after_check(): any
// CHKOPT-NEXT:  %5 = StorePropertyLooseInst %4: closure, globalObject: object, "check_after_check": string
// CHKOPT-NEXT:  %6 = AllocStackInst (:undefined) $?anon_0_ret: any
// CHKOPT-NEXT:  %7 = StoreStackInst undefined: undefined, %6: undefined
// CHKOPT-NEXT:  %8 = LoadStackInst (:undefined) %6: undefined
// CHKOPT-NEXT:  %9 = ReturnInst %8: undefined
// CHKOPT-NEXT:function_end

// CHKOPT:function check_after_store(p: any): any
// CHKOPT-NEXT:frame = [p: any, inner1: closure, x: empty|undefined|number]
// CHKOPT-NEXT:%BB0:
// CHKOPT-NEXT:  %0 = LoadParamInst (:any) %p: any
// CHKOPT-NEXT:  %1 = StoreFrameInst %0: any, [p]: any
// CHKOPT-NEXT:  %2 = StoreFrameInst empty: empty, [x]: empty|undefined|number
// CHKOPT-NEXT:  %3 = CreateFunctionInst (:closure) %inner1(): undefined|number
// CHKOPT-NEXT:  %4 = StoreFrameInst %3: closure, [inner1]: closure
// CHKOPT-NEXT:  %5 = StoreFrameInst undefined: undefined, [x]: empty|undefined|number
// CHKOPT-NEXT:  %6 = TryLoadGlobalPropertyInst (:any) globalObject: object, "inner": string
// CHKOPT-NEXT:  %7 = ReturnInst %6: any
// CHKOPT-NEXT:%BB1:
// CHKOPT-NEXT:  %8 = ReturnInst undefined: undefined
// CHKOPT-NEXT:function_end

// CHKOPT:function check_after_check(): any
// CHKOPT-NEXT:frame = [inner2: closure, x: any|empty]
// CHKOPT-NEXT:%BB0:
// CHKOPT-NEXT:  %0 = StoreFrameInst empty: empty, [x]: any|empty
// CHKOPT-NEXT:  %1 = CreateFunctionInst (:closure) %inner2(): any
// CHKOPT-NEXT:  %2 = StoreFrameInst %1: closure, [inner2]: closure
// CHKOPT-NEXT:  %3 = StoreFrameInst 0: number, [x]: any|empty
// CHKOPT-NEXT:  %4 = TryLoadGlobalPropertyInst (:any) globalObject: object, "inner": string
// CHKOPT-NEXT:  %5 = ReturnInst %4: any
// CHKOPT-NEXT:%BB1:
// CHKOPT-NEXT:  %6 = ReturnInst undefined: undefined
// CHKOPT-NEXT:function_end

// CHKOPT:function inner1(): undefined|number
// CHKOPT-NEXT:frame = []
// CHKOPT-NEXT:%BB0:
// CHKOPT-NEXT:  %0 = LoadFrameInst (:empty|undefined|number) [x@check_after_store]: empty|undefined|number
// CHKOPT-NEXT:  %1 = ThrowIfEmptyInst (:undefined|number) %0: empty|undefined|number
// CHKOPT-NEXT:  %2 = StoreFrameInst 10: number, [x@check_after_store]: empty|undefined|number
// CHKOPT-NEXT:  %3 = LoadFrameInst (:any) [p@check_after_store]: any
// CHKOPT-NEXT:  %4 = CondBranchInst %3: any, %BB1, %BB2
// CHKOPT-NEXT:%BB1:
// CHKOPT-NEXT:  %5 = LoadFrameInst (:empty|undefined|number) [x@check_after_store]: empty|undefined|number
// CHKOPT-NEXT:  %6 = UnionNarrowTrustedInst (:undefined|number) %5: empty|undefined|number
// CHKOPT-NEXT:  %7 = ReturnInst %6: undefined|number
// CHKOPT-NEXT:%BB2:
// CHKOPT-NEXT:  %8 = BranchInst %BB3
// CHKOPT-NEXT:%BB3:
// CHKOPT-NEXT:  %9 = ReturnInst 0: number
// CHKOPT-NEXT:%BB4:
// CHKOPT-NEXT:  %10 = BranchInst %BB3
// CHKOPT-NEXT:%BB5:
// CHKOPT-NEXT:  %11 = ReturnInst undefined: undefined
// CHKOPT-NEXT:function_end

// CHKOPT:function inner2(p: any): any
// CHKOPT-NEXT:frame = [p: any]
// CHKOPT-NEXT:%BB0:
// CHKOPT-NEXT:  %0 = LoadParamInst (:any) %p: any
// CHKOPT-NEXT:  %1 = StoreFrameInst %0: any, [p]: any
// CHKOPT-NEXT:  %2 = LoadFrameInst (:any|empty) [x@check_after_check]: any|empty
// CHKOPT-NEXT:  %3 = ThrowIfEmptyInst (:any) %2: any|empty
// CHKOPT-NEXT:  %4 = UnaryIncInst (:number|bigint) %3: any
// CHKOPT-NEXT:  %5 = StoreFrameInst %4: number|bigint, [x@check_after_check]: any|empty
// CHKOPT-NEXT:  %6 = LoadFrameInst (:any) [p]: any
// CHKOPT-NEXT:  %7 = CondBranchInst %6: any, %BB1, %BB2
// CHKOPT-NEXT:%BB1:
// CHKOPT-NEXT:  %8 = LoadFrameInst (:any|empty) [x@check_after_check]: any|empty
// CHKOPT-NEXT:  %9 = UnionNarrowTrustedInst (:any) %8: any|empty
// CHKOPT-NEXT:  %10 = UnaryIncInst (:number|bigint) %9: any
// CHKOPT-NEXT:  %11 = StoreFrameInst %10: number|bigint, [x@check_after_check]: any|empty
// CHKOPT-NEXT:  %12 = BranchInst %BB3
// CHKOPT-NEXT:%BB2:
// CHKOPT-NEXT:  %13 = BranchInst %BB3
// CHKOPT-NEXT:%BB3:
// CHKOPT-NEXT:  %14 = LoadFrameInst (:any|empty) [x@check_after_check]: any|empty
// CHKOPT-NEXT:  %15 = UnionNarrowTrustedInst (:any) %14: any|empty
// CHKOPT-NEXT:  %16 = ReturnInst %15: any
// CHKOPT-NEXT:%BB4:
// CHKOPT-NEXT:  %17 = ReturnInst undefined: undefined
// CHKOPT-NEXT:function_end
