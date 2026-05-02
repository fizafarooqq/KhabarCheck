import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-16 px-4 bg-primary/10 border-y border-border">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold">Ready to Analyze News?</h2>
        <p className="text-lg text-muted-foreground">Start detecting bias in news articles right now</p>
        <Button asChild size="lg">
          <Link href="/analyze">Start Analyzing</Link>
        </Button>
      </div>
    </section>
  )
}
