'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Camera, Leaf, Droplet, Sun, Bug, Map, BookOpen } from 'lucide-react'

export function PlantAppComponent() {
  const [image, setImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
        setIsProcessing(true)
        setTimeout(() => {
          setIsProcessing(false)
          setResult("장미")  // 실제로는 AI 모델의 결과를 여기에 넣어야 합니다
        }, 3000)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 text-green-900 dark:text-green-50">
      <header className="py-6 md:py-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">식물 식별기</h1>
        <p className="mt-2 text-xl">당신의 정원 속 비밀을 밝혀보세요</p>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <div className="relative w-full h-64 md:h-96 bg-green-200 dark:bg-green-700 rounded-lg overflow-hidden">
            {image ? (
              <Image src={image} alt="Uploaded plant" layout="fill" objectFit="cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Leaf className="w-16 h-16 text-green-500 dark:text-green-300" />
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          >
            <Camera className="inline-block mr-2" />
            사진 찍기
          </button>
        </section>

        {isProcessing && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-12 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xl">식물을 분석하고 있습니다...</p>
          </motion.section>
        )}

        {result && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">이 친구의 이름은 {result}입니다.</h2>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
            >
              더 자세히 알아볼까요?
            </button>
          </motion.section>
        )}

        {showDetails && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="bg-white dark:bg-green-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Droplet className="mr-2" /> 섭생 및 환경
              </h3>
              <p>장미는 충분한 햇빛과 물을 필요로 합니다. 하루 6시간 이상의 직사광선과 주 2-3회의 깊은 물주기가 적당합니다.</p>
            </div>
            <div className="bg-white dark:bg-green-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Sun className="mr-2" /> 주요 관리법
              </h3>
              <p>정기적인 가지치기와 비료 주기가 중요합니다. 봄에는 새 성장을 위해 가지를 잘라주고, 개화기에는 균형 잡힌 비료를 사용하세요.</p>
            </div>
            <div className="bg-white dark:bg-green-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Bug className="mr-2" /> 병해충 처리 방법
              </h3>
              <p>진딧물과 흰가루병에 주의하세요. 정기적으로 잎을 확인하고, 필요시 유기농 살충제나 살균제를 사용하세요.</p>
            </div>
            <div className="bg-white dark:bg-green-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Map className="mr-2" /> 분포지역
              </h3>
              <p>장미는 전 세계적으로 재배되며, 온대 기후에서 가장 잘 자랍니다. 아시아, 유럽, 북미, 호주 등 다양한 지역에서 볼 수 있습니다.</p>
            </div>
          </motion.section>
        )}

        <section className="mt-12 bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-lg text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <BookOpen className="mr-2" /> 나만의 노하우
          </h3>
          <p>장미를 더욱 아름답게 키우고 싶다면, 매주 한 번씩 커피 찌꺼기를 흙에 뿌려주세요. 
             커피의 산성이 토양의 pH를 조절하고 영양분을 공급해 줍니다. 
             또한, 말린 바나나 껍질을 잘게 잘라 흙에 섞어주면 칼륨이 풍부해져 꽃이 더 화려해집니다.</p>
        </section>
      </main>

      <footer className="py-6 text-center text-green-700 dark:text-green-300">
        <p>&copy; 2023 식물 식별기. 모든 권리 보유.</p>
      </footer>
    </div>
  )
}

