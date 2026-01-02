'use client';

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Search,
  Globe,
  Sparkles,
  Mail,
  FileText,
  Calendar,
  Download,
  Target,
  Zap,
  Copy,
  Check,
  Loader2
} from "lucide-react";

const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Generar métricas basadas en el dominio
const generateMetrics = (domain: string) => {
  // Usar el dominio como semilla para generar números consistentes
  const seed = domain.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const baseVisits = 10000 + (seed % 50000);
  const uniqueUsers = Math.floor(baseVisits * 0.74);
  const ranking = 1 + (seed % 100);
  const referringDomains = 50 + (seed % 500);

  return {
    visits: baseVisits,
    visitsChange: (5 + (seed % 20)).toFixed(1),
    uniqueUsers,
    uniqueUsersChange: (3 + (seed % 15)).toFixed(1),
    ranking,
    rankingChange: 5 + (seed % 25),
    referringDomains,
    referringDomainsChange: 10 + (seed % 50),
    trafficSources: [
      { name: 'Google Organico', visits: Math.floor(baseVisits * 0.45), percentage: 45, color: 'bg-emerald-500' },
      { name: 'Directo', visits: Math.floor(baseVisits * 0.25), percentage: 25, color: 'bg-sky-500' },
      { name: 'Redes Sociales', visits: Math.floor(baseVisits * 0.15), percentage: 15, color: 'bg-rose-500' },
      { name: 'Referencias', visits: Math.floor(baseVisits * 0.10), percentage: 10, color: 'bg-amber-500' },
      { name: 'Otros', visits: Math.floor(baseVisits * 0.05), percentage: 5, color: 'bg-slate-500' },
    ],
    keywords: [
      { keyword: domain.replace(/\./g, ' ').replace(/www/g, '').trim(), position: 1 + (seed % 5), traffic: 1000 + (seed % 3000), trend: 'up', change: 10 + (seed % 20) },
      { keyword: `${domain.split('.')[0]} servicios`, position: 5 + (seed % 10), traffic: 500 + (seed % 2000), trend: 'up', change: 5 + (seed % 15) },
      { keyword: `mejor ${domain.split('.')[0]}`, position: 8 + (seed % 15), traffic: 300 + (seed % 1500), trend: 'up', change: 3 + (seed % 12) },
      { keyword: `${domain.split('.')[0]} online`, position: 12 + (seed % 20), traffic: 200 + (seed % 1000), trend: seed % 2 === 0 ? 'up' : 'down', change: 2 + (seed % 10) },
      { keyword: `${domain.split('.')[0]} 2025`, position: 15 + (seed % 25), traffic: 100 + (seed % 800), trend: 'up', change: 8 + (seed % 18) },
    ],
    seoAudit: {
      health: 70 + (seed % 30),
      speed: 50 + (seed % 45),
      mobile: 75 + (seed % 25),
    }
  };
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedDomain, setAnalyzedDomain] = useState<string | null>(null);
  const [metrics, setMetrics] = useState(generateMetrics("www.pasionred.com"));

  const handleAnalyze = () => {
    if (!websiteUrl.trim()) {
      alert("Por favor ingresa un dominio para analizar");
      return;
    }

    setIsAnalyzing(true);

    // Simular tiempo de análisis
    setTimeout(() => {
      const newMetrics = generateMetrics(websiteUrl);
      setMetrics(newMetrics);
      setAnalyzedDomain(websiteUrl);
      setIsAnalyzing(false);
      setActiveTab("dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Marketing Suite</h1>
              <p className="text-xs text-slate-400">Plataforma Profesional de Marketing Digital</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Input
              placeholder="Ingresa tu dominio (ej: miempresa.com)..."
              value={websiteUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWebsiteUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              className="flex-1 md:w-72 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
            />
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analizando...
                </>
              ) : (
                'Analizar'
              )}
            </Button>
          </div>
        </div>
        {analyzedDomain && (
          <div className="container mx-auto px-4 md:px-6 pb-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-400">Analizando:</span>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                {analyzedDomain}
              </Badge>
            </div>
          </div>
        )}
      </header>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-800 bg-slate-900/30 backdrop-blur-sm overflow-x-auto">
        <div className="container mx-auto px-4 md:px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-transparent border-0 h-auto p-0 gap-1 flex-wrap">
              <TabsTrigger
                value="dashboard"
                className="data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-400 rounded-t-lg border-0 text-slate-400 hover:text-white transition-all px-4 md:px-6 py-3 text-sm"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">SEO & Analytics</span>
                <span className="sm:hidden">SEO</span>
              </TabsTrigger>
              <TabsTrigger
                value="social"
                className="data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-400 rounded-t-lg border-0 text-slate-400 hover:text-white transition-all px-4 md:px-6 py-3 text-sm"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Contenido Social</span>
                <span className="sm:hidden">Social</span>
              </TabsTrigger>
              <TabsTrigger
                value="keywords"
                className="data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-400 rounded-t-lg border-0 text-slate-400 hover:text-white transition-all px-4 md:px-6 py-3 text-sm"
              >
                <Search className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Keywords Research</span>
                <span className="sm:hidden">Keywords</span>
              </TabsTrigger>
              <TabsTrigger
                value="email"
                className="data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-400 rounded-t-lg border-0 text-slate-400 hover:text-white transition-all px-4 md:px-6 py-3 text-sm"
              >
                <Mail className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Email Marketing</span>
                <span className="sm:hidden">Email</span>
              </TabsTrigger>
              <TabsTrigger
                value="optimizer"
                className="data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-400 rounded-t-lg border-0 text-slate-400 hover:text-white transition-all px-4 md:px-6 py-3 text-sm"
              >
                <FileText className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Content Optimizer</span>
                <span className="sm:hidden">Optimizer</span>
              </TabsTrigger>
              <TabsTrigger
                value="scheduler"
                className="data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-400 rounded-t-lg border-0 text-slate-400 hover:text-white transition-all px-4 md:px-6 py-3 text-sm"
              >
                <Calendar className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Social Scheduler</span>
                <span className="sm:hidden">Scheduler</span>
              </TabsTrigger>
            </TabsList>

            {/* SEO & Analytics Dashboard */}
            <TabsContent value="dashboard" className="mt-0 border-0">
              <div className="py-8 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20 hover:border-emerald-500/40 transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-slate-400 mb-1">Visitas Totales</p>
                        <h3 className="text-3xl font-bold text-white">{formatNumber(metrics.visits)}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +{metrics.visitsChange}%
                          </Badge>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                        <Eye className="w-6 h-6 text-emerald-400" />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-sky-500/10 to-cyan-500/10 border-sky-500/20 hover:border-sky-500/40 transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-slate-400 mb-1">Usuarios Unicos</p>
                        <h3 className="text-3xl font-bold text-white">{formatNumber(metrics.uniqueUsers)}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className="bg-sky-500/20 text-sky-400 border-sky-500/30">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +{metrics.uniqueUsersChange}%
                          </Badge>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center">
                        <Users className="w-6 h-6 text-sky-400" />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20 hover:border-amber-500/40 transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-slate-400 mb-1">Ranking SEO</p>
                        <h3 className="text-3xl font-bold text-white">#{metrics.ranking}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +{metrics.rankingChange} pos
                          </Badge>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                        <Target className="w-6 h-6 text-amber-400" />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-rose-500/10 to-pink-500/10 border-rose-500/20 hover:border-rose-500/40 transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-slate-400 mb-1">Dominios Referentes</p>
                        <h3 className="text-3xl font-bold text-white">{metrics.referringDomains}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className="bg-rose-500/20 text-rose-400 border-rose-500/30">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +{metrics.referringDomainsChange}
                          </Badge>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center">
                        <Globe className="w-6 h-6 text-rose-400" />
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="p-6 bg-slate-900/50 border-slate-800">
                    <h3 className="text-lg font-semibold text-white mb-4">Trafico por Fuente</h3>
                    <div className="space-y-4">
                      {metrics.trafficSources.map((source, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-300">{source.name}</span>
                            <span className="text-white font-semibold">{formatNumber(source.visits)}</span>
                          </div>
                          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${source.color} rounded-full`}
                              style={{ width: `${source.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6 bg-slate-900/50 border-slate-800">
                    <h3 className="text-lg font-semibold text-white mb-4">Top Keywords</h3>
                    <div className="space-y-3">
                      {metrics.keywords.map((kw, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors">
                          <div className="flex-1">
                            <p className="text-white font-medium text-sm">{kw.keyword}</p>
                            <p className="text-xs text-slate-400 mt-1">Posicion #{kw.position}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-emerald-400 font-semibold text-sm">{kw.traffic}</p>
                            <Badge variant="outline" className={`mt-1 ${kw.trend === 'up' ? 'border-emerald-500/30 text-emerald-400' : 'border-red-500/30 text-red-400'}`}>
                              <TrendingUp className={`w-3 h-3 mr-1 ${kw.trend === 'down' ? 'rotate-180' : ''}`} />
                              {kw.trend === 'up' ? '+' : '-'}{kw.change}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* SEO Audit */}
                <Card className="p-6 bg-slate-900/50 border-slate-800">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                    <h3 className="text-lg font-semibold text-white">Auditoria SEO</h3>
                    <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar Reporte
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: 'Salud del Sitio', score: metrics.seoAudit.health, color: 'bg-emerald-500', status: 'Excelente' },
                      { label: 'Velocidad de Carga', score: metrics.seoAudit.speed, color: 'bg-amber-500', status: 'Bueno' },
                      { label: 'Mobile Friendly', score: metrics.seoAudit.mobile, color: 'bg-emerald-500', status: 'Excelente' },
                    ].map((audit, idx) => (
                      <div key={idx} className="p-4 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-slate-300 text-sm">{audit.label}</span>
                          <Badge className={`${audit.score >= 80 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'}`}>
                            {audit.status}
                          </Badge>
                        </div>
                        <div className="flex items-end gap-3">
                          <span className="text-3xl font-bold text-white">{audit.score}</span>
                          <span className="text-slate-400 text-sm mb-1">/100</span>
                        </div>
                        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mt-3">
                          <div
                            className={`h-full ${audit.color} rounded-full transition-all`}
                            style={{ width: `${audit.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Social Content Generator */}
            <TabsContent value="social" className="mt-0 border-0">
              <SocialContentGenerator />
            </TabsContent>

            {/* Keywords Research */}
            <TabsContent value="keywords" className="mt-0 border-0">
              <KeywordsResearch />
            </TabsContent>

            {/* Email Marketing */}
            <TabsContent value="email" className="mt-0 border-0">
              <EmailMarketing />
            </TabsContent>

            {/* Content Optimizer */}
            <TabsContent value="optimizer" className="mt-0 border-0">
              <ContentOptimizer />
            </TabsContent>

            {/* Social Scheduler */}
            <TabsContent value="scheduler" className="mt-0 border-0">
              <SocialScheduler />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

interface SocialPost {
  platform: string;
  content: string;
  hashtags: string[];
  engagement: number;
}

function SocialContentGenerator() {
  const [topic, setTopic] = useState("");
  const [generatedPosts, setGeneratedPosts] = useState<SocialPost[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generateContent = () => {
    if (!topic.trim()) return;
    const platforms = ['Facebook', 'Instagram', 'Twitter', 'LinkedIn'];
    const engagementValues = [847, 1234, 692, 1089];
    const posts = platforms.map((p, idx) => ({
      platform: p,
      content: `Descubre como ${topic} puede transformar tu negocio.\n\nConsejos probados\nEstrategias efectivas\nResultados reales\n\n#Marketing #${topic.replace(/\s/g, '')} #Negocios`,
      hashtags: ['#Marketing', `#${topic.replace(/\s/g, '')}`, '#Negocios', '#Digital'],
      engagement: engagementValues[idx],
    }));
    setGeneratedPosts(posts);
  };

  const copyContent = (content: string, idx: number) => {
    navigator.clipboard.writeText(content);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="py-8 space-y-6">
      <Card className="p-6 bg-slate-900/50 border-slate-800">
        <h3 className="text-lg font-semibold text-white mb-4">Generar Contenido para Redes Sociales</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Tema o palabra clave..."
            value={topic}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTopic(e.target.value)}
            className="flex-1 bg-slate-800/50 border-slate-700 text-white"
          />
          <Button onClick={generateContent} className="bg-emerald-600 hover:bg-emerald-700">
            <Sparkles className="w-4 h-4 mr-2" />
            Generar Posts
          </Button>
        </div>
      </Card>

      {generatedPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {generatedPosts.map((post, idx) => (
            <Card key={idx} className="p-6 bg-slate-900/50 border-slate-800 hover:border-emerald-500/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  {post.platform}
                </Badge>
                <span className="text-xs text-slate-400">~{post.engagement} engagement estimado</span>
              </div>
              <p className="text-white whitespace-pre-line mb-4">{post.content}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.hashtags.map((tag: string, i: number) => (
                  <span key={i} className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
                onClick={() => copyContent(post.content, idx)}
              >
                {copied === idx ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied === idx ? 'Copiado!' : 'Copiar Contenido'}
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

interface KeywordResult {
  keyword: string;
  volume: number;
  difficulty: number;
  cpc: number;
  trend: string;
}

function KeywordsResearch() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<KeywordResult[]>([]);

  const searchKeywords = () => {
    if (!keyword.trim()) return;
    const kws = [
      { keyword: keyword, volume: 12400, difficulty: 45, cpc: 2.3, trend: 'up' },
      { keyword: `${keyword} gratis`, volume: 8900, difficulty: 32, cpc: 1.8, trend: 'up' },
      { keyword: `mejor ${keyword}`, volume: 6700, difficulty: 58, cpc: 3.1, trend: 'stable' },
      { keyword: `${keyword} online`, volume: 5400, difficulty: 41, cpc: 2.5, trend: 'up' },
      { keyword: `${keyword} 2025`, volume: 3200, difficulty: 28, cpc: 1.9, trend: 'up' },
    ];
    setResults(kws);
  };

  return (
    <div className="py-8 space-y-6">
      <Card className="p-6 bg-slate-900/50 border-slate-800">
        <h3 className="text-lg font-semibold text-white mb-4">Investigacion de Palabras Clave</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Ingresa una palabra clave..."
            value={keyword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
            className="flex-1 bg-slate-800/50 border-slate-700 text-white"
          />
          <Button onClick={searchKeywords} className="bg-emerald-600 hover:bg-emerald-700">
            <Search className="w-4 h-4 mr-2" />
            Buscar
          </Button>
        </div>
      </Card>

      {results.length > 0 && (
        <Card className="p-6 bg-slate-900/50 border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-4">Resultados de Busqueda</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Palabra Clave</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Volumen</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Dificultad</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">CPC</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Tendencia</th>
                </tr>
              </thead>
              <tbody>
                {results.map((kw, idx) => (
                  <tr key={idx} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 text-white font-medium">{kw.keyword}</td>
                    <td className="py-3 px-4 text-emerald-400">{formatNumber(kw.volume)}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${
                        kw.difficulty < 40 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                        kw.difficulty < 60 ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                        'bg-red-500/20 text-red-400 border-red-500/30'
                      }`}>
                        {kw.difficulty}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-white">${kw.cpc}</td>
                    <td className="py-3 px-4">
                      <TrendingUp className={`w-5 h-5 ${kw.trend === 'up' ? 'text-emerald-400' : 'text-slate-400'}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

function EmailMarketing() {
  return (
    <div className="py-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-sky-500/10 to-cyan-500/10 border-sky-500/20">
          <h4 className="text-slate-400 text-sm mb-2">Suscriptores</h4>
          <p className="text-3xl font-bold text-white">2,847</p>
          <Badge className="mt-2 bg-sky-500/20 text-sky-400 border-sky-500/30">
            <TrendingUp className="w-3 h-3 mr-1" />
            +124 este mes
          </Badge>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20">
          <h4 className="text-slate-400 text-sm mb-2">Tasa de Apertura</h4>
          <p className="text-3xl font-bold text-white">34.2%</p>
          <Badge className="mt-2 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <TrendingUp className="w-3 h-3 mr-1" />
            +2.1%
          </Badge>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-rose-500/10 to-pink-500/10 border-rose-500/20">
          <h4 className="text-slate-400 text-sm mb-2">Click Rate</h4>
          <p className="text-3xl font-bold text-white">12.8%</p>
          <Badge className="mt-2 bg-rose-500/20 text-rose-400 border-rose-500/30">
            <TrendingUp className="w-3 h-3 mr-1" />
            +1.3%
          </Badge>
        </Card>
      </div>

      <Card className="p-6 bg-slate-900/50 border-slate-800">
        <h3 className="text-lg font-semibold text-white mb-4">Crear Campana de Email</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Asunto del Email</label>
            <Input
              placeholder="Ej: Oferta Especial - 50% de Descuento"
              className="bg-slate-800/50 border-slate-700 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Contenido</label>
            <textarea
              className="w-full min-h-[200px] p-3 bg-slate-800/50 border border-slate-700 rounded-md text-white resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Escribe el contenido de tu email..."
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Mail className="w-4 h-4 mr-2" />
              Enviar Campana
            </Button>
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              Guardar Borrador
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-slate-900/50 border-slate-800">
        <h3 className="text-lg font-semibold text-white mb-4">Campanas Recientes</h3>
        <div className="space-y-3">
          {[
            { subject: 'Newsletter Semanal - Marketing Tips', sent: 2847, opened: 973, clicked: 234, date: '20 Dic 2025' },
            { subject: 'Oferta Especial Navidad', sent: 2847, opened: 1142, clicked: 412, date: '18 Dic 2025' },
            { subject: 'Guia Completa SEO 2025', sent: 2847, opened: 856, clicked: 289, date: '15 Dic 2025' },
          ].map((campaign, idx) => (
            <div key={idx} className="p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-white font-medium">{campaign.subject}</h4>
                  <p className="text-xs text-slate-400 mt-1">{campaign.date}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-400">Enviados</p>
                  <p className="text-white font-semibold">{campaign.sent}</p>
                </div>
                <div>
                  <p className="text-slate-400">Abiertos</p>
                  <p className="text-emerald-400 font-semibold">{campaign.opened} ({((campaign.opened/campaign.sent)*100).toFixed(1)}%)</p>
                </div>
                <div>
                  <p className="text-slate-400">Clicks</p>
                  <p className="text-sky-400 font-semibold">{campaign.clicked} ({((campaign.clicked/campaign.sent)*100).toFixed(1)}%)</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

interface ContentAnalysis {
  wordCount: number;
  readingTime: number;
  seoScore: number;
  readability: string;
  suggestions: string[];
}

function ContentOptimizer() {
  const [content, setContent] = useState("");
  const [analysis, setAnalysis] = useState<ContentAnalysis | null>(null);

  const analyzeContent = () => {
    const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
    const readingTime = Math.ceil(wordCount / 200);
    setAnalysis({
      wordCount,
      readingTime,
      seoScore: 78,
      readability: 'Buena',
      suggestions: [
        'Anadir mas palabras clave relacionadas',
        'Incluir al menos 3 subtitulos (H2/H3)',
        'Agregar enlaces internos relevantes',
        'Optimizar meta descripcion',
      ]
    });
  };

  return (
    <div className="py-8 space-y-6">
      <Card className="p-6 bg-slate-900/50 border-slate-800">
        <h3 className="text-lg font-semibold text-white mb-4">Optimizador de Contenido</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Pega tu contenido aqui</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[300px] p-3 bg-slate-800/50 border border-slate-700 rounded-md text-white resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Pega el contenido que deseas optimizar..."
            />
          </div>
          <Button onClick={analyzeContent} className="bg-emerald-600 hover:bg-emerald-700">
            <FileText className="w-4 h-4 mr-2" />
            Analizar Contenido
          </Button>
        </div>
      </Card>

      {analysis && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-slate-900/50 border-slate-800">
              <p className="text-slate-400 text-sm mb-1">Palabras</p>
              <p className="text-2xl font-bold text-white">{analysis.wordCount}</p>
            </Card>
            <Card className="p-4 bg-slate-900/50 border-slate-800">
              <p className="text-slate-400 text-sm mb-1">Tiempo de Lectura</p>
              <p className="text-2xl font-bold text-white">{analysis.readingTime} min</p>
            </Card>
            <Card className="p-4 bg-slate-900/50 border-slate-800">
              <p className="text-slate-400 text-sm mb-1">Score SEO</p>
              <p className="text-2xl font-bold text-emerald-400">{analysis.seoScore}/100</p>
            </Card>
            <Card className="p-4 bg-slate-900/50 border-slate-800">
              <p className="text-slate-400 text-sm mb-1">Legibilidad</p>
              <p className="text-2xl font-bold text-white">{analysis.readability}</p>
            </Card>
          </div>

          <Card className="p-6 bg-slate-900/50 border-slate-800">
            <h3 className="text-lg font-semibold text-white mb-4">Sugerencias de Optimizacion</h3>
            <div className="space-y-2">
              {analysis.suggestions.map((suggestion: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-400 text-sm">{idx + 1}</span>
                  </div>
                  <p className="text-slate-300">{suggestion}</p>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

function SocialScheduler() {
  const scheduledPosts = [
    { platform: 'Facebook', content: 'Nuevo articulo sobre marketing digital...', date: '31 Dic 2025', time: '10:00', status: 'programado' },
    { platform: 'Instagram', content: 'Tips de SEO para tu negocio...', date: '31 Dic 2025', time: '14:30', status: 'programado' },
    { platform: 'Twitter', content: 'Lanzamiento de nuestra nueva guia...', date: '1 Ene 2026', time: '09:00', status: 'programado' },
    { platform: 'LinkedIn', content: 'Analisis de tendencias 2026...', date: '1 Ene 2026', time: '16:00', status: 'programado' },
  ];

  return (
    <div className="py-8 space-y-6">
      <Card className="p-6 bg-slate-900/50 border-slate-800">
        <h3 className="text-lg font-semibold text-white mb-4">Programar Nueva Publicacion</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Plataforma</label>
            <select className="w-full p-2 bg-slate-800/50 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option>Facebook</option>
              <option>Instagram</option>
              <option>Twitter</option>
              <option>LinkedIn</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Fecha y Hora</label>
            <div className="flex gap-2">
              <Input type="date" className="bg-slate-800/50 border-slate-700 text-white" />
              <Input type="time" className="bg-slate-800/50 border-slate-700 text-white" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="text-sm text-slate-400 mb-2 block">Contenido</label>
          <textarea
            className="w-full min-h-[120px] p-3 bg-slate-800/50 border border-slate-700 rounded-md text-white resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Escribe tu publicacion..."
          />
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Calendar className="w-4 h-4 mr-2" />
          Programar Publicacion
        </Button>
      </Card>

      <Card className="p-6 bg-slate-900/50 border-slate-800">
        <h3 className="text-lg font-semibold text-white mb-4">Publicaciones Programadas</h3>
        <div className="space-y-3">
          {scheduledPosts.map((post, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row items-start justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-sky-500/20 text-sky-400 border-sky-500/30">
                    {post.platform}
                  </Badge>
                  <span className="text-xs text-slate-400">{post.date} a las {post.time}</span>
                </div>
                <p className="text-white">{post.content}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                  Editar
                </Button>
                <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                  Cancelar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-slate-900/50 border-slate-800">
        <h3 className="text-lg font-semibold text-white mb-4">Calendario de Publicaciones</h3>
        <div className="grid grid-cols-7 gap-2">
          {['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'].map((day, idx) => (
            <div key={idx} className="text-center text-slate-400 text-sm font-medium p-2">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }, (_, i) => (
            <div
              key={i}
              className={`aspect-square p-2 rounded-lg text-center text-sm ${
                i % 7 === 5 || i % 7 === 6 ? 'bg-slate-800/30' : 'bg-slate-800/50'
              } ${
                [5, 12, 18, 24].includes(i) ? 'ring-2 ring-emerald-500/50' : ''
              } hover:bg-slate-700/50 transition-colors cursor-pointer`}
            >
              <span className="text-white">{((i % 31) + 1)}</span>
              {[5, 12, 18, 24].includes(i) && (
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mx-auto mt-1"></div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
