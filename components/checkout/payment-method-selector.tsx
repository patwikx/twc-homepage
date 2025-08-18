"use client"

import { CreditCard, Smartphone, Building } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import type { PaymentMethod } from "@/hooks/use-checkout"

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod
  onMethodChange: (method: PaymentMethod) => void
  className?: string
}

const paymentMethods = [
  {
    id: "credit-card" as PaymentMethod,
    name: "Credit Card",
    description: "Visa, Mastercard, American Express",
    icon: CreditCard,
  },
  {
    id: "debit-card" as PaymentMethod,
    name: "Debit Card",
    description: "Pay directly from your bank account",
    icon: CreditCard,
  },
  {
    id: "paypal" as PaymentMethod,
    name: "PayPal",
    description: "Pay with your PayPal account",
    icon: Smartphone,
  },
  {
    id: "bank-transfer" as PaymentMethod,
    name: "Bank Transfer",
    description: "Direct bank transfer",
    icon: Building,
  },
]

export function PaymentMethodSelector({ selectedMethod, onMethodChange, className }: PaymentMethodSelectorProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Payment Method</h3>
            <p className="text-sm text-muted-foreground">Choose how you'd like to pay for your reservation</p>
          </div>

          <RadioGroup value={selectedMethod} onValueChange={onMethodChange}>
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const IconComponent = method.icon
                return (
                  <div key={method.id} className="flex items-center space-x-3">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Label
                      htmlFor={method.id}
                      className={cn(
                        "flex-1 flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                        selectedMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      <IconComponent className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="font-medium">{method.name}</div>
                        <div className="text-sm text-muted-foreground">{method.description}</div>
                      </div>
                    </Label>
                  </div>
                )
              })}
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )
}
