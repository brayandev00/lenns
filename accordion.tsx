"use client"

import { useState, useEffect } from "react"
import { Shield, Search, Activity, Zap, Globe, Lock, Server, AlertTriangle, CheckCircle, Eye, Terminal, Wifi, Database, Bug, Target, Radar, ChevronRight, Instagram, ArrowRight, Play, RotateCcw, Clock } from "lucide-react"

type ScanPhase = "idle" | "subdomains" | "ports" | "vulnerabilities" | "complete"

interface Subdomain {
  name: string
  status: "found" | "scanning"
  ip?: string
}

interface Port {
  port: number
  service: string
  status: "open" | "filtered" | "closed"
  risk: "low" | "medium" | "high"
}

interface Vulnerability {
  id: string
  name: string
  severity: "critical" | "high" | "medium" | "low"
  description: string
}

export default function CyberLensPage() {
  const [domain, setDomain] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanPhase, setScanPhase] = useState<ScanPhase>("idle")
  const [progress, setProgress] = useState(0)
  const [subdomains, setSubdomains] = useState<Subdomain[]>([])
  const [ports, setPorts] = useState<Port[]>([])
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([])
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [activeFeature, setActiveFeature] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)

  const addTerminalLine = (line: string) => {
    setTerminalLines(prev => [...prev, line])
  }

  const simulateScan = async () => {
    if (!domain.trim()) {
      addTerminalLine("[ERROR] Por favor ingresa un dominio valido")
      return
    }

    setIsScanning(true)
    setShowResults(false)
    setTerminalLines([])
    setSubdomains([])
    setPorts([])
    setVulnerabilities([])
    setProgress(0)

    // Phase 1: Subdomains
    setScanPhase("subdomains")
    addTerminalLine(`[INIT] Iniciando CyberLens v2.0...`)
    await delay(500)
    addTerminalLine(`[TARGET] Objetivo: ${domain}`)
    await delay(300)
    addTerminalLine(`[SCAN] Buscando subdominios...`)

    const subdomainList = [
      { name: `api.${domain}`, ip: "192.168.1.100" },
      { name: `dev.${domain}`, ip: "192.168.1.101" },
      { name: `staging.${domain}`, ip: "192.168.1.102" },
      { name: `admin.${domain}`, ip: "192.168.1.103" },
      { name: `mail.${domain}`, ip: "192.168.1.104" },
      { name: `cdn.${domain}`, ip: "192.168.1.105" },
    ]

    for (let i = 0; i < subdomainList.length; i++) {
      await delay(400)
      setSubdomains(prev => [...prev, { ...subdomainList[i], status: "found" }])
      addTerminalLine(`[+] Subdominio encontrado: ${subdomainList[i].name}`)
      setProgress(Math.round(((i + 1) / subdomainList.length) * 30))
    }

    // Phase 2: Port Scanning
    setScanPhase("ports")
    await delay(500)
    addTerminalLine(`[SCAN] Escaneando puertos abiertos...`)

    const portList: Port[] = [
      { port: 22, service: "SSH", status: "open", risk: "medium" },
      { port: 80, service: "HTTP", status: "open", risk: "low" },
      { port: 443, service: "HTTPS", status: "open", risk: "low" },
      { port: 3306, service: "MySQL", status: "filtered", risk: "high" },
      { port: 8080, service: "HTTP-ALT", status: "open", risk: "medium" },
      { port: 27017, service: "MongoDB", status: "open", risk: "high" },
    ]

    for (let i = 0; i < portList.length; i++) {
      await delay(350)
      setPorts(prev => [...prev, portList[i]])
      const statusIcon = portList[i].status === "open" ? "[!]" : "[~]"
      addTerminalLine(`${statusIcon} Puerto ${portList[i].port} (${portList[i].service}): ${portList[i].status.toUpperCase()}`)
      setProgress(30 + Math.round(((i + 1) / portList.length) * 35))
    }

    // Phase 3: Vulnerability Detection
    setScanPhase("vulnerabilities")
    await delay(500)
    addTerminalLine(`[SCAN] Detectando vulnerabilidades...`)

    const vulnList: Vulnerability[] = [
      { id: "CVE-2024-1234", name: "SQL Injection", severity: "critical", description: "Inyeccion SQL en endpoint /api/users" },
      { id: "CVE-2024-5678", name: "XSS Reflejado", severity: "high", description: "Cross-Site Scripting en parametro search" },
      { id: "CVE-2024-9012", name: "Headers Faltantes", severity: "medium", description: "Faltan headers de seguridad CSP y X-Frame-Options" },
      { id: "CVE-2024-3456", name: "SSL/TLS Debil", severity: "medium", description: "Soporte para TLS 1.0 detectado" },
      { id: "CVE-2024-7890", name: "Info Disclosure", severity: "low", description: "Version de servidor expuesta en headers" },
    ]

    for (let i = 0; i < vulnList.length; i++) {
      await delay(450)
      setVulnerabilities(prev => [...prev, vulnList[i]])
      const severityIcon = vulnList[i].severity === "critical" ? "[!!]" : vulnList[i].severity === "high" ? "[!]" : "[~]"
      addTerminalLine(`${severityIcon} ${vulnList[i].severity.toUpperCase()}: ${vulnList[i].name}`)
      setProgress(65 + Math.round(((i + 1) / vulnList.length) * 35))
    }

    // Complete
    setScanPhase("complete")
    await delay(500)
    addTerminalLine(`[DONE] Escaneo completado`)
    addTerminalLine(`[REPORT] ${subdomainList.length} subdominios | ${portList.filter(p => p.status === "open").length} puertos abiertos | ${vulnList.length} vulnerabilidades`)
    setProgress(100)
    setShowResults(true)
    setIsScanning(false)
  }

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const resetScan = () => {
    setIsScanning(false)
    setScanPhase("idle")
    setProgress(0)
    setSubdomains([])
    setPorts([])
    setVulnerabilities([])
    setTerminalLines([])
    setShowResults(false)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-500 bg-red-500/20 border-red-500/50"
      case "high": return "text-orange-500 bg-orange-500/20 border-orange-500/50"
      case "medium": return "text-yellow-500 bg-yellow-500/20 border-yellow-500/50"
      case "low": return "text-green-500 bg-green-500/20 border-green-500/50"
      default: return "text-gray-500 bg-gray-500/20 border-gray-500/50"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "text-red-400"
      case "medium": return "text-yellow-400"
      case "low": return "text-green-400"
      default: return "text-gray-400"
    }
  }

  const features = [
    {
      icon: Search,
      title: "Web Reconnaissance",
      description: "Descubre subdominios ocultos, servicios expuestos y puntos de entrada mediante tecnicas avanzadas de enumeracion DNS, fuzzing y OSINT.",
      details: ["Enumeracion DNS", "Fuzzing de subdominios", "Busqueda OSINT", "Deteccion de tecnologias"]
    },
    {
      icon: Shield,
      title: "Deteccion de Vulnerabilidades",
      description: "Identifica fallos de seguridad criticos como SQL Injection, XSS, CSRF y configuraciones inseguras en tiempo real.",
      details: ["SQL Injection", "Cross-Site Scripting", "CSRF Detection", "Security Misconfigurations"]
    },
    {
      icon: Globe,
      title: "Attack Surface Management",
      description: "Visualiza y gestiona toda tu superficie de ataque desde un dashboard centralizado con metricas y alertas.",
      details: ["Dashboard en tiempo real", "Inventario de activos", "Mapeo de riesgos", "Reportes ejecutivos"]
    },
    {
      icon: Activity,
      title: "Monitoreo Continuo",
      description: "Vigilancia 24/7 de tu perimetro digital con alertas automaticas ante nuevas amenazas o cambios sospechosos.",
      details: ["Alertas instantaneas", "Integracion Slack/Email", "Historico de cambios", "API disponible"]
    },
    {
      icon: Zap,
      title: "Automatizacion",
      description: "Programa escaneos recurrentes, genera reportes automaticos y mantente siempre un paso adelante de los atacantes.",
      details: ["Escaneos programados", "Reportes PDF/JSON", "CI/CD Integration", "Custom workflows"]
    },
    {
      icon: Lock,
      title: "Compliance & Reporting",
      description: "Cumple con estandares como OWASP Top 10, PCI-DSS y genera reportes listos para auditorias de seguridad.",
      details: ["OWASP Top 10", "PCI-DSS Ready", "Reportes de cumplimiento", "Evidencias de remediacion"]
    }
  ]

  const stats = [
    { value: "99.9%", label: "Precision", icon: Target },
    { value: "500+", label: "Vulnerabilidades Detectables", icon: Bug },
    { value: "24/7", label: "Monitoreo Activo", icon: Clock },
    { value: "<3s", label: "Tiempo de Respuesta", icon: Zap },
  ]

  const techStack = [
    "Python", "Supabase", "React", "JavaScript", "Nmap", "SQLMap", "OWASP ZAP", "Nuclei"
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/10 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Shield className="w-10 h-10 text-cyan-400" />
                <div className="absolute inset-0 bg-cyan-400/30 blur-lg rounded-full" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                CyberLens
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#scanner" className="text-gray-400 hover:text-cyan-400 transition-colors">Scanner</a>
              <a href="#features" className="text-gray-400 hover:text-cyan-400 transition-colors">Caracteristicas</a>
              <a href="#tech" className="text-gray-400 hover:text-cyan-400 transition-colors">Tecnologias</a>
              <a href="#contact" className="text-gray-400 hover:text-cyan-400 transition-colors">Contacto</a>
            </div>

            <a 
              href="#scanner"
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Comenzar
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[90vh] flex items-center justify-center py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-8 animate-pulse">
            <Radar className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">Proyecto de Ciberseguridad</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              CyberLens
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            Mapea, Analiza y Protege tu <span className="text-cyan-400 font-semibold">Superficie de Ataque</span> en tiempo real. 
            Herramienta avanzada de Web Reconnaissance y Gestion de Vulnerabilidades.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a 
              href="#scanner"
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              <Play className="w-5 h-5" />
              Iniciar Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#features"
              className="flex items-center gap-2 px-8 py-4 border-2 border-cyan-500/50 rounded-xl font-bold text-lg text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
            >
              <Eye className="w-5 h-5" />
              Ver Caracteristicas
            </a>
          </div>

          {/* Floating Icons */}
          <div className="hidden md:flex justify-center gap-16 opacity-50">
            <div className="animate-bounce" style={{ animationDelay: "0s" }}>
              <Server className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="animate-bounce" style={{ animationDelay: "0.2s" }}>
              <Database className="w-8 h-8 text-purple-400" />
            </div>
            <div className="animate-bounce" style={{ animationDelay: "0.4s" }}>
              <Wifi className="w-8 h-8 text-blue-400" />
            </div>
            <div className="animate-bounce" style={{ animationDelay: "0.6s" }}>
              <Lock className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Scanner Section */}
      <section id="scanner" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
              Simulador de Escaneo
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experimenta el poder de CyberLens con nuestro simulador interactivo. 
              Ingresa un dominio y observa el proceso de reconocimiento en accion.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <div className="bg-[#12121a]/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 h-fit">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold">Panel de Control</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Dominio Objetivo</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="ejemplo.com"
                      disabled={isScanning}
                      className="flex-1 px-4 py-3 bg-[#0a0a0f] border-2 border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={simulateScan}
                    disabled={isScanning}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isScanning ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Escaneando...
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        Iniciar Reconocimiento
                      </>
                    )}
                  </button>
                  <button
                    onClick={resetScan}
                    className="px-4 py-3 border-2 border-gray-600 rounded-xl hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress */}
                {(isScanning || progress > 0) && (
                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Progreso</span>
                      <span className="text-cyan-400 font-mono">{progress}%</span>
                    </div>
                    <div className="h-3 bg-[#0a0a0f] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      {scanPhase === "subdomains" && "Buscando subdominios..."}
                      {scanPhase === "ports" && "Escaneando puertos..."}
                      {scanPhase === "vulnerabilities" && "Detectando vulnerabilidades..."}
                      {scanPhase === "complete" && "Escaneo completado"}
                    </div>
                  </div>
                )}

                {/* Quick Stats */}
                {showResults && (
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="bg-[#0a0a0f] border border-cyan-500/30 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-cyan-400">{subdomains.length}</div>
                      <div className="text-xs text-gray-500">Subdominios</div>
                    </div>
                    <div className="bg-[#0a0a0f] border border-yellow-500/30 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-400">{ports.filter(p => p.status === "open").length}</div>
                      <div className="text-xs text-gray-500">Puertos Abiertos</div>
                    </div>
                    <div className="bg-[#0a0a0f] border border-red-500/30 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-red-400">{vulnerabilities.length}</div>
                      <div className="text-xs text-gray-500">Vulnerabilidades</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Terminal */}
            <div className="bg-[#0d0d12] border border-cyan-500/20 rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#0a0a0f] border-b border-cyan-500/20">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-sm text-gray-500 font-mono">cyberlens@terminal</span>
              </div>
              <div className="p-4 h-[400px] overflow-y-auto font-mono text-sm">
                {terminalLines.length === 0 ? (
                  <div className="text-gray-500">
                    <span className="text-cyan-400">$</span> Esperando comando...
                  </div>
                ) : (
                  terminalLines.map((line, i) => (
                    <div 
                      key={i} 
                      className={`mb-1 ${
                        line.includes("[ERROR]") || line.includes("[!!]") ? "text-red-400" :
                        line.includes("[!]") ? "text-yellow-400" :
                        line.includes("[+]") || line.includes("[DONE]") ? "text-green-400" :
                        line.includes("[SCAN]") || line.includes("[INIT]") ? "text-cyan-400" :
                        "text-gray-300"
                      }`}
                    >
                      {line}
                    </div>
                  ))
                )}
                {isScanning && (
                  <div className="flex items-center gap-2 text-cyan-400">
                    <span>$</span>
                    <div className="w-2 h-4 bg-cyan-400 animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Dashboard */}
          {showResults && (
            <div className="mt-8 grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Subdomains */}
              <div className="bg-[#12121a]/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  <h4 className="font-bold">Subdominios Encontrados</h4>
                </div>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {subdomains.map((sub, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2 bg-[#0a0a0f] rounded-lg">
                      <span className="text-sm text-gray-300 font-mono">{sub.name}</span>
                      <span className="text-xs text-gray-500">{sub.ip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ports */}
              <div className="bg-[#12121a]/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Server className="w-5 h-5 text-yellow-400" />
                  <h4 className="font-bold">Puertos Detectados</h4>
                </div>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {ports.map((port, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2 bg-[#0a0a0f] rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${port.status === "open" ? "bg-green-400" : port.status === "filtered" ? "bg-yellow-400" : "bg-red-400"}`} />
                        <span className="text-sm font-mono">{port.port}</span>
                        <span className="text-xs text-gray-500">{port.service}</span>
                      </div>
                      <span className={`text-xs ${getRiskColor(port.risk)}`}>{port.risk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vulnerabilities */}
              <div className="bg-[#12121a]/80 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <h4 className="font-bold">Vulnerabilidades</h4>
                </div>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {vulnerabilities.map((vuln, i) => (
                    <div key={i} className="px-3 py-2 bg-[#0a0a0f] rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold">{vuln.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${getSeverityColor(vuln.severity)}`}>
                          {vuln.severity}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{vuln.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
              Caracteristicas Principales
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Herramientas avanzadas diseñadas para proteger tu infraestructura digital
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`group relative bg-[#12121a]/80 backdrop-blur-xl border rounded-2xl p-6 transition-all duration-500 cursor-pointer overflow-hidden ${
                  activeFeature === i 
                    ? "border-cyan-400 shadow-xl shadow-cyan-500/20 scale-[1.02]" 
                    : "border-cyan-500/20 hover:border-cyan-500/50"
                }`}
                onClick={() => setActiveFeature(activeFeature === i ? null : i)}
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Top bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 transform origin-left transition-transform duration-500 ${activeFeature === i ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-cyan-400" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
                  
                  <div className={`space-y-2 overflow-hidden transition-all duration-500 ${activeFeature === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                    {feature.details.map((detail, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span className="text-gray-300">{detail}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-1 text-cyan-400 text-sm mt-4 group-hover:gap-2 transition-all">
                    <span>Ver mas</span>
                    <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${activeFeature === i ? "rotate-90" : ""}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
              Tecnologias Utilizadas
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Stack tecnologico profesional para analisis de seguridad
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="px-6 py-3 bg-[#12121a]/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-default"
              >
                <span className="font-mono text-sm text-gray-300">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-12 text-center overflow-hidden">
            {/* Animated glow */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-gradient-conic from-cyan-500/20 via-transparent to-purple-500/20 animate-spin-slow" />
            </div>
            
            <div className="relative">
              <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Protege tu Infraestructura
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto mb-8">
                CyberLens es un proyecto de ciberseguridad desarrollado para demostrar 
                capacidades avanzadas de reconocimiento web y deteccion de vulnerabilidades.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="#scanner"
                  className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <Play className="w-5 h-5" />
                  Probar Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-cyan-500/20 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-cyan-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                CyberLens
              </span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="https://instagram.com/_brayanf0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
                <Instagram className="w-6 h-6" />
                <span className="text-sm">@_brayanf0</span>
              </a>
            </div>
            
            <p className="text-gray-500 text-sm">
              &copy; 2024 CyberLens. Proyecto de Ciberseguridad.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  )
}
