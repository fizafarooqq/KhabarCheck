import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Features() {
  const features = [
    {
      title: "AI Text Analysis",
      description: "Advanced transformer models detect political bias patterns in any article",
    },
    {
      title: "Real-Time Detection",
      description: "Get instant results with confidence scores and detailed explanations",
    },
    {
      title: "Clean Interface",
      description: "Intuitive design for seamless article analysis and results visualization",
    },
    {
      title: "Admin Dashboard",
      description: "Comprehensive moderation tools for managing articles and logs",
    },
  ]

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Core Features</h2>
          <p className="text-lg text-muted-foreground">Everything you need to understand media bias</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border/50">
              <CardHeader>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
