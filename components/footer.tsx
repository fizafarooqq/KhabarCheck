import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">KhabarCheck</h3>
            <p className="text-sm text-muted-foreground">AI-powered political bias detection for news articles</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/analyze" className="text-muted-foreground hover:text-foreground">
                  Analyzer
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Developers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs#api" className="text-muted-foreground hover:text-foreground">
                  API Docs
                </Link>
              </li>
              <li>
                <Link href="/docs#limits" className="text-muted-foreground hover:text-foreground">
                  Limitations
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs#ethics" className="text-muted-foreground hover:text-foreground">
                  Ethics
                </Link>
              </li>
              <li>
                <Link href="/docs#about" className="text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; 2025 KhabarCheck. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
