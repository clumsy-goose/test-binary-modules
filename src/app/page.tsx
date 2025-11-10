"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, ExternalLink, Zap, CheckCircle2, XCircle, Loader2 } from "lucide-react"

interface ApiEndpoint {
  path: string
  method: string
  description: string
  category: string
}

const API_ENDPOINTS: ApiEndpoint[] = [
  { path: "/express", method: "GET", description: "测试 Express 根路由", category: "基础" },
  { path: "/express/users/123/test", method: "GET", description: "测试路由参数", category: "基础" },
  { path: "/express/context", method: "GET", description: "测试 Context 上下文", category: "基础" },
  { path: "/express/argon2", method: "GET", description: "测试 Argon2 密码哈希", category: "加密" },
  { path: "/express/bcrypt", method: "GET", description: "测试 Bcrypt 密码哈希", category: "加密" },
  { path: "/express/sqlite3", method: "GET", description: "测试 SQLite3 数据库", category: "数据库" },
  { path: "/express/better-sqlite3", method: "GET", description: "测试 Better-SQLite3", category: "数据库" },
  { path: "/express/pg-native", method: "GET", description: "测试 PostgreSQL Native", category: "数据库" },
  { path: "/express/skia-canvas", method: "GET", description: "测试 Skia Canvas 图像生成", category: "图像处理" },
  { path: "/express/sharp", method: "GET", description: "测试 Sharp 图像处理", category: "图像处理" },
  { path: "/express/ffmpeg-static", method: "GET", description: "测试 FFmpeg 视频处理", category: "媒体处理" },
  { path: "/express/onnxruntime", method: "GET", description: "测试 ONNX Runtime 机器学习", category: "AI/ML" },
  { path: "/express/winknlp", method: "GET", description: "测试 WinkNLP 自然语言处理", category: "AI/ML" },
  { path: "/express/tensorflow", method: "GET", description: "测试 TensorFlow.js", category: "AI/ML" },
  { path: "/express/puppeteer", method: "GET", description: "测试 Puppeteer 浏览器自动化", category: "浏览器" },
  { path: "/express/playwright", method: "GET", description: "测试 Playwright", category: "浏览器" },
  { path: "/express/chrome-aws-lambda", method: "GET", description: "测试 Chrome AWS Lambda", category: "浏览器" },
]

export default function Home() {
  const [results, setResults] = useState<Record<string, { status: string; message: string }>>({})
  const [loadingEndpoints, setLoadingEndpoints] = useState<Set<string>>(new Set())

  const handleApiCall = async (endpoint: ApiEndpoint) => {
    const key = endpoint.path
    setLoadingEndpoints(prev => new Set(prev).add(key))
    
    try {
      const response = await fetch(endpoint.path)
      
      if (response.headers.get('content-type')?.includes('image')) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        setResults(prev => ({
          ...prev,
          [key]: { status: 'success', message: `图片生成成功 (${blob.size} bytes)` }
        }))
      } else {
        const data = await response.json()
        setResults(prev => ({
          ...prev,
          [key]: { status: 'success', message: JSON.stringify(data, null, 2) }
        }))
      }
    } catch (error) {
      setResults(prev => ({
        ...prev,
        [key]: { status: 'error', message: error instanceof Error ? error.message : '未知错误' }
      }))
    } finally {
      setLoadingEndpoints(prev => {
        const next = new Set(prev)
        next.delete(key)
        return next
      })
    }
  }

  const categories = Array.from(new Set(API_ENDPOINTS.map(e => e.category)))

  const getStatusIcon = (path: string) => {
    const result = results[path]
    const isLoading = loadingEndpoints.has(path)
    
    if (isLoading) {
      return <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
    }
    if (!result) return null
    if (result.status === 'success') {
      return <CheckCircle2 className="w-4 h-4 text-green-400" />
    }
    return <XCircle className="w-4 h-4 text-red-400" />
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="https://pages.edgeone.ai" target="_blank" rel="noopener noreferrer">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6rounded-full flex items-center justify-center">
                <img src="/eo-logo-blue.svg" alt="EdgeOne Pages" width={32} height={32} />
              </div>
              <h1 className="text-lg font-semibold">EdgeOne Pages</h1>
            </div>
            </a>
            <a
              href="https://github.com/TencentEdgeOne/express-template"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Main Title */}
          <div className="space-y-4 text-center">
            <h1 className="text-5xl font-bold leading-tight">
              Binary Modules Test - Node Functions
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              测试各种二进制模块在 EdgeOne Pages Node Functions 中的运行情况
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="https://edgeone.ai/pages/new?from=github&template=express-template" target="_blank" rel="noopener noreferrer">
            <Button 
              size="lg" 
              className="bg-[#1c66e5] hover:bg-[#1c66e5]/90 text-white px-8 py-3 text-lg cursor-pointer"
            >
              <Zap className="w-5 h-5 mr-2" />
              一键部署
            </Button>
            </a>
            <a href="https://pages.edgeone.ai/document/node-functions" target="_blank" rel="noopener noreferrer">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-gray-600 hover:bg-gray-800 text-white px-8 py-3 text-lg cursor-pointer"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              查看文档
            </Button>
            </a>
          </div>

          {/* API Endpoints by Category */}
          {categories.map(category => (
            <div key={category} className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-100 border-b border-gray-700 pb-2">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {API_ENDPOINTS.filter(e => e.category === category).map(endpoint => (
                  <Card key={endpoint.path} className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-white mb-1 truncate">
                              {endpoint.description}
                            </h3>
                            <p className="text-xs text-gray-400 font-mono truncate">
                              {endpoint.method} {endpoint.path}
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            {getStatusIcon(endpoint.path)}
                          </div>
                        </div>
                        
                        <Button
                          onClick={() => handleApiCall(endpoint)}
                          disabled={loadingEndpoints.has(endpoint.path)}
                          size="sm"
                          className="w-full bg-[#1c66e5] hover:bg-[#1c66e5]/90 text-white cursor-pointer"
                        >
                          {loadingEndpoints.has(endpoint.path) ? (
                            <>
                              <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                              测试中...
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 mr-2" />
                              测试
                            </>
                          )}
                        </Button>

                        {results[endpoint.path] && (
                          <div className={`text-xs p-2 rounded ${
                            results[endpoint.path].status === 'success' 
                              ? 'bg-green-900/20 text-green-300 border border-green-700/50' 
                              : 'bg-red-900/20 text-red-300 border border-red-700/50'
                          }`}>
                            <pre className="whitespace-pre-wrap break-all max-h-32 overflow-y-auto">
                              {results[endpoint.path].message}
                            </pre>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {/* Info Card */}
          <Card className="bg-gray-900 border-gray-700 mt-8">
            <CardHeader>
              <CardTitle className="text-lg">📦 已安装的二进制模块</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
                {['argon2', 'bcrypt', 'sqlite3', 'better-sqlite3', 'pg-native', 'skia-canvas', 
                  'ffmpeg-static', 'onnxruntime-node', 'wink-nlp', '@tensorflow/tfjs-node', 
                  'puppeteer', 'playwright', 'chrome-aws-lambda', 'sharp'].map(pkg => (
                  <div key={pkg} className="bg-gray-800 px-3 py-2 rounded text-gray-300 font-mono text-xs">
                    {pkg}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-gray-400">
            <p>Powered by EdgeOne Pages</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
