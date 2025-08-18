"use client"

import { useState } from "react"
import { ArrowLeft, Loader2, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PaymentMethodSelector } from "./payment-method-selector"
import { CreditCardForm } from "./credit-card-form"
import { BillingAddressForm } from "./billing-address-form"
import { PaymentConfirmation } from "./payment-confirmation"
import { useCheckout } from "@/hooks/use-checkout"
import type { Reservation } from "@/lib/types/booking"
import { PaymentSummary } from "./payment-summary"

interface CheckoutFormProps {
  reservation: Reservation
  onBack: () => void
  onComplete: () => void
  className?: string
}

export function CheckoutForm({ reservation, onBack, onComplete, className }: CheckoutFormProps) {
  const checkout = useCheckout()
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handlePayment = async () => {
    try {
      await checkout.actions.processPayment(reservation.id)
      if (checkout.state.paymentResult?.success) {
        setShowConfirmation(true)
      }
    } catch (error) {
      console.error("[v0] Payment processing error:", error)
    }
  }

  const handleDownloadReceipt = () => {
    console.log("[v0] Download receipt for transaction:", checkout.state.paymentResult?.transactionId)
  }

  const handleEmailReceipt = () => {
    console.log("[v0] Email receipt for transaction:", checkout.state.paymentResult?.transactionId)
  }

  const handleNewBooking = () => {
    checkout.actions.resetCheckout()
    setShowConfirmation(false)
    onComplete()
  }

  if (showConfirmation && checkout.state.paymentResult) {
    return (
      <PaymentConfirmation
        reservation={reservation}
        transactionId={checkout.state.paymentResult.transactionId}
        onDownloadReceipt={handleDownloadReceipt}
        onEmailReceipt={handleEmailReceipt}
        onNewBooking={handleNewBooking}
        className={className}
      />
    )
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Complete Your Payment</h1>
              <p className="text-muted-foreground">Secure checkout for your reservation</p>
            </div>
          </div>

          {/* Payment Method Selection */}
          <PaymentMethodSelector
            selectedMethod={checkout.state.selectedPaymentMethod}
            onMethodChange={checkout.actions.setPaymentMethod}
          />

          {/* Payment Details Form */}
          {(checkout.state.selectedPaymentMethod === "credit-card" ||
            checkout.state.selectedPaymentMethod === "debit-card") && (
            <CreditCardForm
              paymentDetails={checkout.state.paymentDetails}
              onPaymentDetailsChange={checkout.actions.updatePaymentDetails}
            />
          )}

          {/* PayPal Integration Placeholder */}
          {checkout.state.selectedPaymentMethod === "paypal" && (
            <div className="p-8 text-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">PayPal Integration</h3>
                <p className="text-muted-foreground">PayPal payment integration would be implemented here</p>
                <Button variant="outline" className="bg-[#0070ba] text-white hover:bg-[#005ea6]">
                  Continue with PayPal
                </Button>
              </div>
            </div>
          )}

          {/* Bank Transfer Information */}
          {checkout.state.selectedPaymentMethod === "bank-transfer" && (
            <div className="p-6 bg-muted rounded-lg">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Bank Transfer Instructions</h3>
                <div className="text-sm space-y-2">
                  <p>Please transfer the total amount to the following account:</p>
                  <div className="font-mono bg-background p-3 rounded border">
                    <div>Bank: Tropicana Worldwide Bank</div>
                    <div>Account: 1234-5678-9012-3456</div>
                    <div>Swift: TWCBANKXXX</div>
                    <div>Reference: {reservation.id.slice(-8).toUpperCase()}</div>
                  </div>
                  <p className="text-muted-foreground">
                    Your reservation will be confirmed once payment is received (usually 1-2 business days).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Billing Address */}
          {(checkout.state.selectedPaymentMethod === "credit-card" ||
            checkout.state.selectedPaymentMethod === "debit-card") && (
            <BillingAddressForm
              billingAddress={checkout.state.billingAddress}
              guest={reservation.guest}
              onBillingAddressChange={checkout.actions.updateBillingAddress}
            />
          )}

          {/* Error Display */}
          {checkout.state.error && (
            <Alert variant="destructive">
              <AlertDescription>
                {checkout.state.error}
                <button onClick={checkout.actions.clearError} className="ml-2 underline hover:no-underline">
                  Dismiss
                </button>
              </AlertDescription>
            </Alert>
          )}

          {/* Payment Button */}
          <div className="flex justify-end">
            <Button
              onClick={handlePayment}
              disabled={!checkout.computed.canProcessPayment || checkout.state.isProcessing}
              size="lg"
              className="min-w-[200px]"
            >
              {checkout.state.isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: reservation.currency,
                  }).format(reservation.totalAmount)}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Payment Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <PaymentSummary reservation={reservation} />
          </div>
        </div>
      </div>
    </div>
  )
}
