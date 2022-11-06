// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import Foundation

/// Lifter to convert FuzzIL into its human readable text format
public class FuzzILLifter: Lifter {

    public init() {}

    private func lift(_ v: Variable) -> String {
        return "v\(v.number)"
    }

    private func lift(_ instr : Instruction, with w: inout ScriptWriter) {
        func input(_ n: Int) -> String {
            return lift(instr.input(n))
        }

        func output() -> String {
            return lift(instr.output)
        }

        func innerOutput() -> String {
            return lift(instr.innerOutput)
        }

        switch instr.op {
        case let op as LoadInteger:
            w.emit("\(output()) <- LoadInteger '\(op.value)'")

        case let op as LoadBigInt:
            w.emit("\(output()) <- LoadBigInt '\(op.value)'")

        case let op as LoadFloat:
            w.emit("\(output()) <- LoadFloat '\(op.value)'")

        case let op as LoadString:
            w.emit("\(output()) <- LoadString '\(op.value)'")

        case let op as LoadRegExp:
            w.emit("\(output()) <- LoadRegExp '\(op.value)' '\(op.flags.asString())'")

        case let op as LoadBoolean:
            w.emit("\(output()) <- LoadBoolean '\(op.value)'")

        case is LoadUndefined:
            w.emit("\(output()) <- LoadUndefined")

        case is LoadNull:
            w.emit("\(output()) <- LoadNull")

        case is LoadThis:
            w.emit("\(output()) <- LoadThis")

        case is LoadArguments:
            w.emit("\(output()) <- LoadArguments")

        case let op as CreateObject:
            var properties = [String]()
            for (index, propertyName) in op.propertyNames.enumerated() {
                properties.append("'\(propertyName)':\(input(index))")
            }
            w.emit("\(output()) <- CreateObject [\(properties.joined(separator: ", "))]")

        case is CreateArray:
            let elems = instr.inputs.map(lift).joined(separator: ", ")
            w.emit("\(output()) <- CreateArray [\(elems)]")

        case let op as CreateObjectWithSpread:
            var properties = [String]()
            for (index, propertyName) in op.propertyNames.enumerated() {
                properties.append("'\(propertyName)':\(input(index))")
            }
            // Remaining ones are spread.
            for v in instr.inputs.dropFirst(properties.count) {
                properties.append("...\(lift(v))")
            }
            w.emit("\(output()) <- CreateObjectWithSpread [\(properties.joined(separator: ", "))]")

        case let op as CreateArrayWithSpread:
            var elems = [String]()
            for (i, v) in instr.inputs.enumerated() {
                if op.spreads[i] {
                    elems.append("...\(lift(v))")
                } else {
                    elems.append(lift(v))
                }
            }
            w.emit("\(output()) <- CreateArrayWithSpread [\(elems.joined(separator: ", "))]")

        case let op as CreateTemplateString:
            let parts = op.parts.map({ "'\($0)'" }).joined(separator: ", ")
            let values = instr.inputs.map(lift).joined(separator: ", ")
            w.emit("\(output()) <- CreateTemplateString [\(parts)], [\(values)]")

        case let op as LoadBuiltin:
            w.emit("\(output()) <- LoadBuiltin '\(op.builtinName)'")

        case let op as LoadProperty:
            w.emit("\(output()) <- LoadProperty \(input(0)), '\(op.propertyName)'")

        case let op as StoreProperty:
            w.emit("StoreProperty \(input(0)), '\(op.propertyName)', \(input(1))")

        case let op as StorePropertyWithBinop:
            w.emit("\(input(0)) <- StorePropertyWithBinop '\(op.op.token)', \(input(1))")

        case let op as DeleteProperty:
            w.emit("\(output()) <- DeleteProperty \(input(0)), '\(op.propertyName)'")

        case let op as ConfigureProperty:
            w.emit("ConfigureProperty \(input(0)), '\(op.propertyName)', '\(op.flags)', '\(op.type)' [\(instr.inputs.suffix(from: 1).map(lift))]")

        case let op as LoadElement:
            w.emit("\(output()) <- LoadElement \(input(0)), '\(op.index)'")

        case let op as StoreElement:
            w.emit("StoreElement \(input(0)), '\(op.index)', \(input(1))")

        case let op as StoreElementWithBinop:
            w.emit("\(instr.input(0)) <- StoreElementWithBinop '\(op.index)', '\(op.op.token)', \(input(1))")

        case let op as DeleteElement:
            w.emit("\(output()) <- DeleteElement \(input(0)), '\(op.index)'")

        case let op as ConfigureElement:
            w.emit("ConfigureElement \(input(0)), '\(op.index)', '\(op.flags)', '\(op.type)' [\(instr.inputs.suffix(from: 1).map(lift))]")

        case is LoadComputedProperty:
            w.emit("\(output()) <- LoadComputedProperty \(input(0)), \(input(1))")

        case is StoreComputedProperty:
            w.emit("StoreComputedProperty \(input(0)), \(input(1)), \(input(2))")

        case let op as StoreComputedPropertyWithBinop:
            w.emit("StoreComputedPropertyWithBinop \(input(0)), \(input(1)), '\(op.op.token)',\(input(2))")

        case is DeleteComputedProperty:
            w.emit("\(output()) <- DeleteComputedProperty \(input(0)), \(input(1))")

        case let op as ConfigureComputedProperty:
            w.emit("ConfigureComputedProperty \(input(0)), \(input(1)), '\(op.flags)', '\(op.type)' [\(instr.inputs.suffix(from: 2).map(lift))]")

        case is TypeOf:
            w.emit("\(output()) <- TypeOf \(input(0))")

        case is TestInstanceOf:
            w.emit("\(output()) <- TestInstanceOf \(input(0)), \(input(1))")

        case is TestIn:
            w.emit("\(output()) <- TestIn \(input(0)), \(input(1))")

        case let op as BeginAnyFunction:
            let params = instr.innerOutputs.map(lift).joined(separator: ", ")
            w.emit("\(output()) <- \(op.name) -> \(params)\(op.isStrict ? ", strict" : "")")
            w.increaseIndentionLevel()

        case let op as EndAnyFunction:
            w.decreaseIndentionLevel()
            w.emit("\(op.name)")

        case let op as BeginConstructor:
            let params = instr.innerOutputs.map(lift).joined(separator: ", ")
            w.emit("\(output()) <- \(op.name) -> \(params)")
            w.increaseIndentionLevel()

        case let op as EndConstructor:
            w.decreaseIndentionLevel()
            w.emit("\(op.name)")

        case is Return:
            w.emit("Return \(input(0))")

        case is Yield:
            w.emit("\(output()) <- Yield \(input(0))")

        case is YieldEach:
            w.emit("YieldEach \(input(0))")

        case is Await:
            w.emit("\(output()) <- Await \(input(0))")

        case is CallFunction:
            w.emit("\(output()) <- CallFunction \(input(0)), [\(liftCallArguments(instr.variadicInputs))]")

        case let op as CallFunctionWithSpread:
            w.emit("\(output()) <- CallFunctionWithSpread \(input(0)), [\(liftCallArguments(instr.variadicInputs, spreading: op.spreads))]")

        case is Construct:
            w.emit("\(output()) <- Construct \(input(0)), [\(liftCallArguments(instr.variadicInputs))]")

        case let op as ConstructWithSpread:
            w.emit("\(output()) <- ConstructWithSpread \(input(0)), [\(liftCallArguments(instr.variadicInputs, spreading: op.spreads))]")

        case let op as CallMethod:
            w.emit("\(output()) <- CallMethod \(input(0)), '\(op.methodName)', [\(liftCallArguments(instr.variadicInputs))]")

        case let op as CallMethodWithSpread:
            w.emit("\(output()) <- CallMethodWithSpread \(input(0)), '\(op.methodName)', [\(liftCallArguments(instr.variadicInputs, spreading: op.spreads))]")

        case is CallComputedMethod:
            w.emit("\(output()) <- CallComputedMethod \(input(0)), \(input(1)), [\(liftCallArguments(instr.variadicInputs))]")

        case let op as CallComputedMethodWithSpread:
            w.emit("\(output()) <- CallComputedMethodWithSpread \(input(0)), \(input(1)), [\(liftCallArguments(instr.variadicInputs, spreading: op.spreads))]")

        case let op as UnaryOperation:
            if op.op.isPostfix {
                w.emit("\(output()) <- UnaryOperation \(input(0)), '\(op.op.token)'")
            } else {
                w.emit("\(output()) <- UnaryOperation '\(op.op.token)', \(input(0))")
            }

        case let op as BinaryOperation:
            w.emit("\(output()) <- BinaryOperation \(input(0)), '\(op.op.token)', \(input(1))")

        case is TernaryOperation:
            w.emit("\(output()) <- TernaryOperation \(input(0)), \(input(1)), \(input(2))")

        case is Reassign:
            w.emit("Reassign \(input(0)), \(input(1))")

        case let op as ReassignWithBinop:
            w.emit("ReassignWithBinop \(instr.input(0)), '\(op.op.token)', \(input(1))")

        case is Dup:
            w.emit("\(output()) <- Dup \(input(0))")

        case let op as DestructArray:
            let outputs = instr.outputs.map(lift)
            w.emit("[\(liftArrayDestructPattern(indices: op.indices, outputs: outputs, hasRestElement: op.hasRestElement))] <- DestructArray \(input(0))")

        case let op as DestructArrayAndReassign:
            let outputs = instr.inputs.dropFirst().map(lift)
            w.emit("[\(liftArrayDestructPattern(indices: op.indices, outputs: outputs, hasRestElement: op.hasRestElement))] <- DestructArrayAndReassign \(input(0))")

        case let op as DestructObject:
            let outputs = instr.outputs.map(lift)
            w.emit("{\(liftObjectDestructPattern(properties: op.properties, outputs: outputs, hasRestElement: op.hasRestElement))} <- DestructObject \(input(0))")

        case let op as DestructObjectAndReassign:
            let outputs = instr.inputs.dropFirst().map(lift)
            w.emit("{\(liftObjectDestructPattern(properties: op.properties, outputs: outputs, hasRestElement: op.hasRestElement))} <- DestructObjectAndReassign \(input(0))")

        case let op as Compare:
            w.emit("\(output()) <- Compare \(input(0)), '\(op.op.token)', \(input(1))")

        case let op as Eval:
            let args = instr.inputs.map(lift).joined(separator: ", ")
            w.emit("Eval '\(op.code)', [\(args)]")

        case is Explore:
            let arguments = instr.inputs.suffix(from: 1).map(lift).joined(separator: ", ")
            w.emit("Explore \(instr.input(0)), [\(arguments)]")

        case is Probe:
            w.emit("Probe \(instr.input(0))")

        case is BeginWith:
            w.emit("BeginWith \(input(0))")
            w.increaseIndentionLevel()

        case is EndWith:
            w.decreaseIndentionLevel()
            w.emit("EndWith")

        case let op as LoadFromScope:
            w.emit("\(output()) <- LoadFromScope '\(op.id)'")

        case let op as StoreToScope:
            w.emit("StoreToScope '\(op.id)', \(input(0))")

        case is Nop:
            w.emit("Nop")

        case let op as BeginIf:
            let mode = op.inverted ? "(inverted) " : ""
            w.emit("BeginIf \(mode)\(input(0))")
            w.increaseIndentionLevel()

        case is BeginElse:
            w.decreaseIndentionLevel()
            w.emit("BeginElse")
            w.increaseIndentionLevel()

        case is EndIf:
            w.decreaseIndentionLevel()
            w.emit("EndIf")

        case is BeginSwitch:
            w.emit("BeginSwitch \(input(0))")
            w.increaseIndentionLevel()

        case is BeginSwitchCase:
            w.emit("BeginSwitchCase \(input(0))")
            w.increaseIndentionLevel()

        case is BeginSwitchDefaultCase:
            w.emit("BeginSwitchDefaultCase")
            w.increaseIndentionLevel()

        case let op as EndSwitchCase:
            w.decreaseIndentionLevel()
            w.emit("EndSwitchCase \(op.fallsThrough ? "fallsThrough" : "")")

        case is EndSwitch:
            w.decreaseIndentionLevel()
            w.emit("EndSwitch")

       case let op as BeginClass:
           var line = "\(output()) <- BeginClass"
           if instr.hasInputs {
               line += " \(input(0)),"
           }
           line += " \(op.instanceProperties),"
           line += " \(Array(op.instanceMethods.map({ $0.name })))"
           w.emit(line)
           w.increaseIndentionLevel()

       case is BeginMethod:
           w.decreaseIndentionLevel()
           let params = instr.innerOutputs.map(lift).joined(separator: ", ")
           w.emit("BeginMethod -> \(params)")
           w.increaseIndentionLevel()

       case is EndClass:
           w.decreaseIndentionLevel()
           w.emit("EndClass")

       case is CallSuperConstructor:
           w.emit("CallSuperConstructor [\(liftCallArguments(instr.variadicInputs))]")

       case let op as CallSuperMethod:
           w.emit("\(output()) <- CallSuperMethod '\(op.methodName)', [\(liftCallArguments(instr.variadicInputs))]")

       case let op as LoadSuperProperty:
           w.emit("\(output()) <- LoadSuperProperty '\(op.propertyName)'")

       case let op as StoreSuperProperty:
           w.emit("StoreSuperProperty '\(op.propertyName)', \(input(0))")

        case let op as StoreSuperPropertyWithBinop:
            w.emit("StoreSuperPropertyWithBinop '\(op.propertyName)', '\(op.op.token)', \(input(0))")

        case let op as BeginWhileLoop:
            w.emit("BeginWhileLoop \(input(0)), '\(op.comparator.token)', \(input(1))")
            w.increaseIndentionLevel()

        case is EndWhileLoop:
            w.decreaseIndentionLevel()
            w.emit("EndWhileLoop")

        case let op as BeginDoWhileLoop:
            w.emit("BeginDoWhileLoop \(input(0)), '\(op.comparator.token)', \(input(1))")
            w.increaseIndentionLevel()

        case is EndDoWhileLoop:
            w.decreaseIndentionLevel()
            w.emit("EndDoWhileLoop")

        case let op as BeginForLoop:
            w.emit("BeginForLoop \(input(0)), '\(op.comparator.token)', \(input(1)), '\(op.op.token)', \(input(2)) -> \(innerOutput())")
            w.increaseIndentionLevel()

        case is EndForLoop:
            w.decreaseIndentionLevel()
            w.emit("EndForLoop")

        case is BeginForInLoop:
            w.emit("BeginForInLoop \(input(0)) -> \(innerOutput())")
            w.increaseIndentionLevel()

        case is EndForInLoop:
            w.decreaseIndentionLevel()
            w.emit("EndForInLoop")

        case is BeginForOfLoop:
            w.emit("BeginForOfLoop \(input(0)) -> \(innerOutput())")
            w.increaseIndentionLevel()

        case let op as BeginForOfWithDestructLoop:
            let outputs = instr.innerOutputs.map(lift)
            w.emit("BeginForOfLoop \(input(0)) -> [\(liftArrayDestructPattern(indices: op.indices, outputs: outputs, hasRestElement: op.hasRestElement))]")
            w.increaseIndentionLevel()

        case is EndForOfLoop:
            w.decreaseIndentionLevel()
            w.emit("EndForOfLoop")

        case let op as BeginRepeatLoop:
            w.emit("BeginLoop \(op.iterations) -> \(innerOutput())")
            w.increaseIndentionLevel()

        case is EndRepeatLoop:
            w.decreaseIndentionLevel()
            w.emit("EndLoop")

        case is LoopBreak,
             is SwitchBreak:
            w.emit("Break")

        case is LoopContinue:
            w.emit("Continue")

        case is BeginTry:
            w.emit("BeginTry")
            w.increaseIndentionLevel()

        case is BeginCatch:
            w.decreaseIndentionLevel()
            w.emit("BeginCatch -> \(innerOutput())")
            w.increaseIndentionLevel()

        case is BeginFinally:
            w.decreaseIndentionLevel()
            w.emit("BeginFinally")
            w.increaseIndentionLevel()

        case is EndTryCatchFinally:
            w.decreaseIndentionLevel()
            w.emit("EndTryCatch")

        case is ThrowException:
            w.emit("ThrowException \(input(0))")

        case is BeginCodeString:
            w.emit("\(output()) <- BeginCodeString")
            w.increaseIndentionLevel()

        case is EndCodeString:
            w.decreaseIndentionLevel()
            w.emit("EndCodeString")

        case is BeginBlockStatement:
            w.emit("BeginBlockStatement")
            w.increaseIndentionLevel()

        case is EndBlockStatement:
            w.decreaseIndentionLevel()
            w.emit("EndBlockStatement")

        case is Print:
            w.emit("Print \(input(0))")

        default:
            fatalError("Unhandled Operation: \(type(of: instr.op))")
        }
    }

    public func lift(_ program: Program, withOptions options: LiftingOptions) -> String {
        var w = ScriptWriter()

        if options.contains(.includeComments), let header = program.comments.at(.header) {
            w.emitComment(header)
        }

        for instr in program.code {
            if options.contains(.includeComments), let comment = program.comments.at(.instruction(instr.index)) {
                w.emitComment(comment)
            }

            lift(instr, with: &w)
        }

        if options.contains(.includeComments), let footer = program.comments.at(.footer) {
            w.emitComment(footer)
        }

        return w.code
    }

    public func lift(_ code: Code) -> String {
        var w = ScriptWriter()

        for instr in code {
            lift(instr, with: &w)
        }

        return w.code
    }

    private func liftCallArguments(_ args: ArraySlice<Variable>, spreading spreads: [Bool] = []) -> String {
        var arguments = [String]()
        for (i, v) in args.enumerated() {
            if spreads.count > i && spreads[i] {
                arguments.append("...\(lift(v))")
            } else {
                arguments.append(lift(v))
            }
        }
        return arguments.joined(separator: ", ")
    }

    private func liftArrayDestructPattern(indices: [Int64], outputs: [String], hasRestElement: Bool) -> String {
        assert(indices.count == outputs.count)

        var arrayPattern = ""
        var lastIndex = 0
        for (index64, output) in zip(indices, outputs) {
            let index = Int(index64)
            let skipped = index - lastIndex
            lastIndex = index
            let dots = index == indices.last! && hasRestElement ? "..." : ""
            arrayPattern += String(repeating: ",", count: skipped) + dots + output
        }

        return arrayPattern
    }

    private func liftObjectDestructPattern(properties: [String], outputs: [String], hasRestElement: Bool) -> String {
        assert(outputs.count == properties.count + (hasRestElement ? 1 : 0))

        var objectPattern = ""
        for (property, output) in zip(properties, outputs) {
            objectPattern += "\(property):\(output),"
        }
        if hasRestElement {
            objectPattern += "...\(outputs.last!)"
        }

        return objectPattern
    }
}

