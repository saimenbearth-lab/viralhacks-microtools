/*
  BEARTH website — Operator Terminal theme.
  Dark default. Navy bg, Gold primary, Signal Red accent.
  Routing kept simple via wouter.
*/
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import SiteShell from "./components/SiteShell";
import Home from "./pages/Home";
import SignalPage from "./pages/Signal";
import VaultPage from "./pages/Vault";
import ToolsPage from "./pages/Tools";
import SystemsPage from "./pages/Systems";
import StudioPage from "./pages/Studio";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import ImprintPage from "./pages/legal/Imprint";
import PrivacyPage from "./pages/legal/Privacy";
import TermsPage from "./pages/legal/Terms";

function Router() {
  return (
    <SiteShell>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/signal" component={SignalPage} />
        <Route path="/vault" component={VaultPage} />
        <Route path="/tools" component={ToolsPage} />
        <Route path="/systems" component={SystemsPage} />
        <Route path="/studio" component={StudioPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/legal/imprint" component={ImprintPage} />
        <Route path="/legal/privacy" component={PrivacyPage} />
        <Route path="/legal/terms" component={TermsPage} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </SiteShell>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
