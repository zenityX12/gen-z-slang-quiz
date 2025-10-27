import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Headphones, CheckCircle2, Smartphone, Trophy } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Gen Z Slang Quiz</h1>
              <p className="text-xs text-muted-foreground">ทดสอบความรู้ศัพท์แสลง</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6 md:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <section className="text-center space-y-4 py-6">
            <h2 className="text-2xl md:text-4xl font-semibold text-foreground">
              เรียนรู้ศัพท์แสลงของคนรุ่น Gen Z
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              ทดสอบความเข้าใจในศัพท์แสลงที่กำลังได้รับความนิยม
              พร้อมเรียนรู้ความหมายและการออกเสียงที่ถูกต้อง
            </p>
          </section>

          {/* Quiz Mode Cards */}
          <section className="grid md:grid-cols-2 gap-4 md:gap-6">
            {/* Meaning Quiz */}
            <Card className="transition-all duration-200 hover:shadow-lg hover:border-primary/50">
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">ทดสอบความหมาย</CardTitle>
                    <CardDescription className="text-sm">
                      ทายความหมายของศัพท์แสลง
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setLocation('/quiz/meaning')}
                >
                  เริ่มทดสอบ
                </Button>
              </CardContent>
            </Card>

            {/* Pronunciation Quiz */}
            <Card className="transition-all duration-200 hover:shadow-lg hover:border-primary/50">
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                    <Headphones className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">ทดสอบการออกเสียง</CardTitle>
                    <CardDescription className="text-sm">
                      ทายการออกเสียงที่ถูกต้อง
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setLocation('/quiz/pronunciation')}
                >
                  เริ่มทดสอบ
                </Button>
              </CardContent>
            </Card>
          </section>

          {/* Features Section */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-xl">คุณสมบัติของแอปพลิเคชัน</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted">
                      <BookOpen className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="font-semibold">20+ คำศัพท์</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      ศัพท์แสลงยอดนิยมของ Gen Z
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted">
                      <Trophy className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="font-semibold">2 โหมดทดสอบ</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      ทดสอบความหมายและการออกเสียง
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2 sm:col-span-2 lg:col-span-1">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted">
                      <Smartphone className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="font-semibold">รองรับมือถือ</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      ใช้งานได้ลื่นไหลบนทุกอุปกรณ์
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* How it works */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-center">วิธีการใช้งาน</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="bg-card">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-semibold">
                      1
                    </div>
                    <h4 className="font-semibold">เลือกโหมด</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      เลือกทดสอบความหมายหรือการออกเสียง
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-semibold">
                      2
                    </div>
                    <h4 className="font-semibold">ตอบคำถาม</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      ตอบคำถาม 10 ข้อจากศัพท์แสลงต่าง ๆ
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-semibold">
                      3
                    </div>
                    <h4 className="font-semibold">ดูผลคะแนน</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      ตรวจสอบคำตอบและเรียนรู้จากข้อผิดพลาด
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Gen Z Slang Quiz. เรียนรู้ศัพท์แสลงอย่างสนุกสนาน
          </p>
        </div>
      </footer>
    </div>
  );
}

