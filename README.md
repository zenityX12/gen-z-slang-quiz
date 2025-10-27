# Gen Z Slang Quiz 🎯

แอปเว็บสำหรับเรียนรู้ศัพท์แสลงของคนรุ่น Gen Z ผ่านการทดสอบความหมายและตัวอย่างประโยค

## ✨ ฟีเจอร์

- 📚 **ศัพท์แสลง Gen Z มากกว่า 20 คำ** - รวบรวมศัพท์ยอดนิยมที่ใช้กันในปัจจุบัน
- 🎮 **2 โหมดทดสอบ**
  - **ทดสอบความหมาย**: ทายความหมายของศัพท์แสลง
  - **ทดสอบตัวอย่างประโยค**: เลือกประโยคที่ใช้ศัพท์ในบริบทที่ถูกต้อง
- 📱 **Mobile-First Design**: ออกแบบให้ใช้งานบนมือถือได้อย่างลื่นไหล
- 🎨 **UI/UX ที่ทันสมัย**: ใช้ฟอนต์ Kanit และ Color Palette ที่สุขุมมืออาชีพ
- 📊 **ระบบคะแนนและรีวิว**: แสดงคะแนนและรีวิวคำตอบที่ถูกต้อง

## 🛠️ เทคโนโลยีที่ใช้

- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Tailwind CSS 4** - Styling
- **Vite** - Build Tool
- **shadcn/ui** - UI Components
- **Wouter** - Routing

## 🚀 การติดตั้งและรันโปรเจกต์

```bash
# Clone repository
git clone https://github.com/zenityX12/gen-z-slang-quiz.git
cd gen-z-slang-quiz

# ติดตั้ง dependencies
pnpm install

# รันโปรเจกต์
pnpm dev
```

เปิดเบราว์เซอร์ที่ `http://localhost:3000`

## 📦 Build สำหรับ Production

```bash
pnpm build
```

## 🎯 วิธีการใช้งาน

1. เลือกโหมดทดสอบที่ต้องการ (ทดสอบความหมาย หรือ ทดสอบตัวอย่างประโยค)
2. ตอบคำถาม 10 ข้อ
3. ดูคะแนนและรีวิวคำตอบที่ถูกต้อง
4. ลองทำแบบทดสอบอีกครั้งเพื่อเรียนรู้เพิ่มเติม

## 📝 โครงสร้างโปรเจกต์

```
client/
├── public/
│   └── slang-data.json      # ข้อมูลศัพท์แสลง
├── src/
│   ├── components/          # UI Components
│   ├── pages/              # หน้าต่าง ๆ
│   ├── types/              # TypeScript Types
│   ├── lib/                # Utility Functions
│   └── App.tsx             # Main App Component
```

## 🤝 การมีส่วนร่วม

หากต้องการมีส่วนร่วมในการพัฒนาโปรเจกต์นี้ สามารถ Fork และส่ง Pull Request ได้เลย

## 📄 License

MIT License

## 👨‍💻 ผู้พัฒนา

สร้างด้วย ❤️ โดย [zenityX12](https://github.com/zenityX12)
