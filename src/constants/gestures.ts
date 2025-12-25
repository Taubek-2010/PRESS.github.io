import { SignLanguageGesture } from '../types';

export const ASL_GESTURES: SignLanguageGesture[] = [
  {
    name: 'Hello',
    landmarks: [[4, 8, 12, 16, 20]], 
    threshold: 0.8
  },
  {
    name: 'Thank you',
    landmarks: [[4, 8]], 
    threshold: 0.7
  },
  {
    name: 'Please',
    landmarks: [[8, 12]], 
    threshold: 0.75
  },
  {
    name: 'Yes',
    landmarks: [[8]], 
    threshold: 0.8
  },
  {
    name: 'No',
    landmarks: [[8, 12]], 
    threshold: 0.7
  },
  {
    name: 'Good',
    landmarks: [[4]], 
    threshold: 0.8
  },
  {
    name: 'Bad',
    landmarks: [[4, 8, 12, 16, 20]], 
    threshold: 0.7
  },
  {
    name: 'Love',
    landmarks: [[8, 12, 16]], 
    threshold: 0.75
  },
  {
    name: 'Help',
    landmarks: [[4, 8]], 
    threshold: 0.7
  },
  {
    name: 'Sorry',
    landmarks: [[4]], 
    threshold: 0.75
  },
  {
    name: 'Water',
    landmarks: [[8, 12, 16]], 
    threshold: 0.7
  },
  {
    name: 'Food',
    landmarks: [[4, 8]], 
    threshold: 0.7
  },
  {
    name: 'Home',
    landmarks: [[4, 8, 12, 16, 20]], 
    threshold: 0.8
  },
  {
    name: 'Work',
    landmarks: [[8, 12]], 
    threshold: 0.7
  },
  {
    name: 'Family',
    landmarks: [[4, 8, 12]], 
    threshold: 0.75
  }
];

export const RSL_GESTURES: SignLanguageGesture[] = [
  {
    name: 'Привет', 
    landmarks: [[4, 8, 12, 16, 20]],
    threshold: 0.8
  },
  {
    name: 'Спасибо', 
    landmarks: [[4, 8]],
    threshold: 0.7
  },
  {
    name: 'Пожалуйста',
    landmarks: [[8, 12]],
    threshold: 0.75
  },
  {
    name: 'Да', 
    landmarks: [[8]],
    threshold: 0.8
  },
  {
    name: 'Нет', 
    landmarks: [[8, 12]],
    threshold: 0.7
  },
  {
    name: 'Хорошо', 
    landmarks: [[4]],
    threshold: 0.8
  },
  {
    name: 'Плохо', 
    landmarks: [[4, 8, 12, 16, 20]],
    threshold: 0.7
  },
  {
    name: 'Любовь', 
    landmarks: [[8, 12, 16]],
    threshold: 0.75
  },
  {
    name: 'Помощь', 
    landmarks: [[4, 8]],
    threshold: 0.7
  },
  {
    name: 'Извините', 
    landmarks: [[4]],
    threshold: 0.75
  },
  {
    name: 'Вода', 
    landmarks: [[8, 12, 16]],
    threshold: 0.7
  },
  {
    name: 'Еда', 
    landmarks: [[4, 8]],
    threshold: 0.7
  },
  {
    name: 'Дом', 
    landmarks: [[4, 8, 12, 16, 20]],
    threshold: 0.8
  },
  {
    name: 'Работа', 
    landmarks: [[8, 12]],
    threshold: 0.7
  },
  {
    name: 'Семья', 
    landmarks: [[4, 8, 12]],
    threshold: 0.75
  }
];

export const KSL_GESTURES: SignLanguageGesture[] = [
  {
    name: 'Сәлем', 
    landmarks: [[4, 8, 12, 16, 20]],
    threshold: 0.8
  },
  {
    name: 'Рахмет', 
    landmarks: [[4, 8]],
    threshold: 0.7
  },
  {
    name: 'Өтінемін', 
    landmarks: [[8, 12]],
    threshold: 0.75
  },
  {
    name: 'Иә', 
    landmarks: [[8]],
    threshold: 0.8
  },
  {
    name: 'Жоқ', 
    landmarks: [[8, 12]],
    threshold: 0.7
  },
  {
    name: 'Жақсы', 
    landmarks: [[4]],
    threshold: 0.8
  },
  {
    name: 'Жаман', 
    landmarks: [[4, 8, 12, 16, 20]],
    threshold: 0.7
  },
  {
    name: 'Махаббат', 
    landmarks: [[8, 12, 16]],
    threshold: 0.75
  },
  {
    name: 'Көмек', 
    landmarks: [[4, 8]],
    threshold: 0.7
  },
  {
    name: 'Кешіріңіз', 
    landmarks: [[4]],
    threshold: 0.75
  },
  {
    name: 'Су', 
    landmarks: [[8, 12, 16]],
    threshold: 0.7
  },
  {
    name: 'Тамақ', 
    landmarks: [[4, 8]],
    threshold: 0.7
  },
  {
    name: 'Үй', 
    landmarks: [[4, 8, 12, 16, 20]],
    threshold: 0.8
  },
  {
    name: 'Жұмыс',
    landmarks: [[8, 12]],
    threshold: 0.7
  },
  {
    name: 'Отбасы', 
    landmarks: [[4, 8, 12]],
    threshold: 0.75
  }
];