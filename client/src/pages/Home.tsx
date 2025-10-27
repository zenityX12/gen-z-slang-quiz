import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, MessageSquare, Trophy, Smartphone } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container py-3 md:py-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary text-primary-foreground flex-shrink-0">
              <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <div>
              <h1 className="text-base md:text-lg font-semibold">Gen Z Slang Quiz</h1>
              <p className="text-xs text-muted-foreground">ทดสอบความรู้ศัพท์แสลง</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-4 md:py-12 pb-safe">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* Hero Section */}
          <section className="text-center space-y-3 md:space-y-4 py-4 md:py-6">
            <h2 className="text-2xl md:text-4xl font-semibold text-foreground px-4">
              เรียนรู้ศัพท์แสลงของคนรุ่น Gen Z
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
              ทดสอบความเข้าใจในศัพท์แสลงที่กำลังได้รับความนิยม
              พร้อมเรียนรู้ความหมายและการใช้งานที่ถูกต้อง
            </p>
          </section>

          {/* Quiz Mode Cards */}
          <section className="grid md:grid-cols-2 gap-3 md:gap-6">
            {/* Meaning Quiz */}
            <Card className="transition-all duration-200 hover:shadow-lg hover:border-primary/50">
              <CardHeader className="space-y-2 md:space-y-3 pb-3 md:pb-6">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                    <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-lg md:text-xl">ทดสอบความหมาย</CardTitle>
                    <CardDescription className="text-xs md:text-sm">
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

            {/* Usage Quiz */}
            <Card className="transition-all duration-200 hover:shadow-lg hover:border-primary/50">
              <CardHeader className="space-y-2 md:space-y-3 pb-3 md:pb-6">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                    <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-lg md:text-xl">ทดสอบตัวอย่างประโยค</CardTitle>
                    <CardDescription className="text-xs md:text-sm">
                      เลือกประโยคที่ใช้ศัพท์ได้ถูกต้อง
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setLocation('/quiz/usage')}
                >
                  เริ่มทดสอบ
                </Button>
              </CardContent>
            </Card>
          </section>

          {/* Features Section */}
          <section>
            <Card>
              <CardHeader className="pb-4 md:pb-6">
                <CardTitle className="text-center text-lg md:text-xl">คุณสมบัติของแอปพลิเคชัน</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-muted">
                      <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                    </div>
                    <h3 className="font-semibold text-sm md:text-base">20+ คำศัพท์</h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      ศัพท์แสลงยอดนิยมของ Gen Z
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-muted">
                      <Trophy className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                    </div>
                    <h3 className="font-semibold text-sm md:text-base">2 โหมดทดสอบ</h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      ทดสอบความหมายและตัวอย่างประโยค
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2 sm:col-span-2 lg:col-span-1">
                    <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-muted">
                      <Smartphone className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                    </div>
                    <h3 className="font-semibold text-sm md:text-base">รองรับมือถือ</h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      ใช้งานได้ลื่นไหลบนทุกอุปกรณ์
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* How it works */}
          <section className="space-y-3 md:space-y-4">
            <h3 className="text-lg md:text-xl font-semibold text-center">วิธีการใช้งาน</h3>
            <div className="grid sm:grid-cols-3 gap-3 md:gap-4">
              <Card className="bg-card">
                <CardContent className="pt-4 md:pt-6 pb-4 md:pb-6">
                  <div className="flex flex-col items-center text-center space-y-2 md:space-y-3">
                    <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-primary-foreground font-semibold text-sm md:text-base">
                      1
                    </div>
                    <h4 className="font-semibold text-sm md:text-base">เลือกโหมด</h4>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      เลือกทดสอบความหมายหรือตัวอย่างประโยค
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardContent className="pt-4 md:pt-6 pb-4 md:pb-6">
                  <div className="flex flex-col items-center text-center space-y-2 md:space-y-3">
                    <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-primary-foreground font-semibold text-sm md:text-base">
                      2
                    </div>
                    <h4 className="font-semibold text-sm md:text-base">ตอบคำถาม</h4>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      ตอบคำถาม 10 ข้อจากศัพท์แสลงต่าง ๆ
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardContent className="pt-4 md:pt-6 pb-4 md:pb-6">
                  <div className="flex flex-col items-center text-center space-y-2 md:space-y-3">
                    <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-primary-foreground font-semibold text-sm md:text-base">
                      3
                    </div>
                    <h4 className="font-semibold text-sm md:text-base">ดูผลคะแนน</h4>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
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
      <footer className="border-t mt-8 md:mt-12">
        <div className="container py-4 md:py-6">
          <p className="text-center text-xs md:text-sm text-muted-foreground">
            © 2025 Gen Z Slang Quiz. เรียนรู้ศัพท์แสลงอย่างสนุกสนาน
          </p>
        </div>
      </footer>
    </div>
  );
}

