"use client";

import { useState } from "react";
import Card from "@/components/ui/display/Card";
import Input from "@/components/ui/forms/Input";

interface NewsletterSignupProps {
  variant?: "default" | "footer" | "inline";
  title?: string;
  description?: string;
}

export default function NewsletterSignup({
  variant = "default",
  title = "Stay Updated",
  description = "Get the latest news on new arrivals, sales, and marine tips.",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      // Use Shopify Customer API for newsletter signup
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim(),
          acceptsMarketing: true,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage("Thanks for subscribing! Welcome to our newsletter.");
        setEmail("");
        setFirstName("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Newsletter signup error:", error);
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Footer variant
  if (variant === "footer") {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>

        <form onSubmit={handleSubmit} className="space-y-3 max-w-full">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              variant="transparent"
              size="md"
              disabled={isSubmitting}
              required
              fullWidth
              className="flex-1 min-w-0"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-deep-blue hover:bg-[#0a3a6e] text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isSubmitting ? "..." : "Subscribe"}
            </button>
          </div>

          {status === "success" && (
            <p className="text-sm text-green-400">{message}</p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400">{message}</p>
          )}
        </form>
      </div>
    );
  }

  // Inline variant
  if (variant === "inline") {
    return (
      <div className="bg-deep-blue rounded-lg p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm opacity-90">{description}</p>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 md:min-w-80">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              variant="transparent"
              size="md"
              disabled={isSubmitting}
              required
              fullWidth
              className="flex-1 bg-white/20 border-white/30 placeholder-white/70"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-white text-deep-blue rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "..." : "Subscribe"}
            </button>
          </form>
        </div>

        {status === "success" && (
          <p className="text-sm text-green-200 mt-3">{message}</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-200 mt-3">{message}</p>
        )}
      </div>
    );
  }

  // Default variant - full form
  return (
    <Card padding="lg" shadow="lg" border>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-charcoal mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name (optional)"
            size="lg"
            disabled={isSubmitting}
            fullWidth
          />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address*"
            size="lg"
            disabled={isSubmitting}
            required
            fullWidth
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-deep-blue hover:bg-[#0a3a6e] text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe to Newsletter"}
        </button>

        {status === "success" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">{message}</p>
          </div>
        )}
        {status === "error" && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{message}</p>
          </div>
        )}
      </form>

      <p className="text-xs text-gray-500 mt-4 text-center">
        By subscribing, you agree to receive marketing emails. You can
        unsubscribe at any time.
      </p>
    </Card>
  );
}
