import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Mic, Sparkles } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <div className="container py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Sparkles className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Gen Z Slang Quiz
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              ทดสอบความรู้ศัพท์แสลงของคนรุ่น Z ผ่านการทดสอบความหมายและการออกเสียง
              <br />
              พร้อมเรียนรู้คำศัพท์ใหม่ ๆ ที่กำลังฮิตในยุคนี้!
            </p>
          </div>

          {/* Quiz Mode Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Meaning Quiz */}
            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Brain className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl">ทดสอบความหมาย</CardTitle>
                <CardDescription className="text-center">
                  ทายความหมายของศัพท์แสลง Gen Z
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setLocation('/quiz/meaning')}
                >
                  เริ่มทดสอบความหมาย
                </Button>
              </CardContent>
            </Card>

            {/* Pronunciation Quiz */}
            <Card className="border-2 hover:border-secondary transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="bg-secondary/10 p-3 rounded-full group-hover:bg-secondary/20 transition-colors">
                    <Mic className="w-8 h-8 text-secondary" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl">ทดสอบการออกเสียง</CardTitle>
                <CardDescription className="text-center">
                  ทายการออกเสียงที่ถูกต้องของศัพท์แสลง
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  size="lg"
                  variant="secondary"
                  onClick={() => setLocation('/quiz/pronunciation')}
                >
                  เริ่มทดสอบการออกเสียง
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-center">คุณสมบัติของแอป</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <div className="text-3xl">📚</div>
                  <h3 className="font-semibold">20+ คำศัพท์</h3>
                  <p className="text-sm text-muted-foreground">
                    ศัพท์แสลงยอดนิยมของ Gen Z
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl">🎯</div>
                  <h3 className="font-semibold">2 โหมดทดสอบ</h3>
                  <p className="text-sm text-muted-foreground">
                    ทดสอบความหมายและการออกเสียง
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl">📱</div>
                  <h3 className="font-semibold">รองรับมือถือ</h3>
                  <p className="text-sm text-muted-foreground">
                    ใช้งานได้ลื่นไหลบนทุกอุปกรณ์
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

