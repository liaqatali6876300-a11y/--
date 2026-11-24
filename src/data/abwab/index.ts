import { Baab, SawalJawab } from '../../types/bahar';
import { baab01Aqaaid } from './baab01_aqaaid';
import { baab02Tahaarat } from './baab02_tahaarat';
import { baab03Wuzu } from './baab03_wuzu';
import { baab04Ghusl } from './baab04_ghusl';
import { baab05Namaz } from './baab05_namaz';
import { baab06Jumuah } from './baab06_jumuah';
import { baab07Eidain } from './baab07_eidain';
import { baab08Roza } from './baab08_roza';
import { baab09Zakat } from './baab09_zakat';
import { baab10Hajj } from './baab10_hajj';
import { baab11Nikah } from './baab11_nikah';
import { baab12Talaq } from './baab12_talaq';
import { baab13Tijarat } from './baab13_tijarat';
import { baab14Qurbani } from './baab14_qurbani';
import { baab15Janazah } from './baab15_janazah';
import { baab16KhanaPeena } from './baab16_khanaPeena';
import { baab17QasmNazr } from './baab17_qasmNazr';
import { baab18WasiyatWirasat } from './baab18_wasiyatWirasat';
import { baab19AkhlaqAdab } from './baab19_akhlaqAdab';

export const ABWAB: Baab[] = [
  {
    id: 'aqaaid',
    shortName: 'عقائد',
    title: 'باب العقائد',
    description: 'ایمان، توحید، رسالت، ختمِ نبوت، صحابہ و اہلِ بیت، قبر و قیامت اور بنیادی اسلامی عقائد کے مسائل۔',
    masail: baab01Aqaaid,
  },
  {
    id: 'tahaarat',
    shortName: 'طہارت',
    title: 'باب الطہارت',
    description: 'نجاستِ غلیظہ و خفیفہ، پانی و کنویں کی پاکی، استنجا، کپڑوں کی صفائی، حیض و نفاس کے مسائل۔',
    masail: baab02Tahaarat,
  },
  {
    id: 'wuzu',
    shortName: 'وضو',
    title: 'باب الوضو',
    description: 'وضو کے فرائض، سنتیں، نواقضِ وضو، موزوں پر مسح، پٹی کا مسح اور تیمم کے روزمرہ مسائل۔',
    masail: baab03Wuzu,
  },
  {
    id: 'ghusl',
    shortName: 'غسل',
    title: 'باب الغسل',
    description: 'غسل کے فرائض و سنتیں، جنابت و حیض کے بعد غسل کے احکام اور عملی مسائل۔',
    masail: baab04Ghusl,
  },
  {
    id: 'namaz',
    shortName: 'نماز',
    title: 'باب الصلاۃ (نماز)',
    description: 'شرائط و ارکانِ نماز، واجبات، سجدۂ سہو، جماعت، امامت، مسافر کی قصر، وتر اور قضا نمازیں۔',
    masail: baab05Namaz,
  },
  {
    id: 'jumuah',
    shortName: 'جمعہ',
    title: 'باب الجمعہ',
    description: 'جمعہ کی شرائط، اذان و خطبے کے آداب، سنتیں اور جمعہ کے روز کے خصوصی مسائل۔',
    masail: baab06Jumuah,
  },
  {
    id: 'eidain',
    shortName: 'عیدین',
    title: 'باب العیدین',
    description: 'عید الفطر اور عید الاضحیٰ کی نماز، چھ زائد تکبیریں، صدقۂ فطر اور تکبیرِ تشریق کے احکام۔',
    masail: baab07Eidain,
  },
  {
    id: 'roza',
    shortName: 'روزہ',
    title: 'باب الصوم (روزہ)',
    description: 'سحری و افطار، نیت، مفسداتِ صوم، قضا و کفارہ، فدیہ اور اعتکاف کے مکمل مسائل۔',
    masail: baab08Roza,
  },
  {
    id: 'zakat',
    shortName: 'زکوٰۃ',
    title: 'باب الزکوٰۃ',
    description: 'سونا چاندی و مالِ تجارت کا نصاب، قرض، مصارفِ زکوٰۃ، تملیک اور عشر کے تفصیلی مسائل۔',
    masail: baab09Zakat,
  },
  {
    id: 'hajj',
    shortName: 'حج',
    title: 'باب الحج',
    description: 'حج و عمرہ کے فرائض، میقات و احرام، طواف و سعی، وقوفِ عرفہ و مزدلفہ اور رمیِ جمار۔',
    masail: baab10Hajj,
  },
  {
    id: 'nikah',
    shortName: 'نکاح',
    title: 'باب النکاح',
    description: 'نکاح کی شرائط، گواہ، مہر، محرمات، رضاعت، ولیمہ اور حقوقِ زوجین کے مسائل۔',
    masail: baab11Nikah,
  },
  {
    id: 'talaq',
    shortName: 'طلاق',
    title: 'باب الطلاق',
    description: 'طلاقِ رجعی و بائن و مغلظہ، تین طلاقیں، خلع، عدتِ طلاق و وفات اور پرورشِ اولاد۔',
    masail: baab12Talaq,
  },
  {
    id: 'tijarat',
    shortName: 'تجارت',
    title: 'باب التجارت',
    description: 'خرید و فروخت، سود و ربا کی حرمت، شراکت، اجارہ، قرض، امانت اور حلال کمائی کے مسائل۔',
    masail: baab13Tijarat,
  },
  {
    id: 'qurbani',
    shortName: 'قربانی',
    title: 'باب القربانی',
    description: 'قربانی کا نصاب، جانوروں کی عمر و عیوب، سات حصے، کھال، گوشت کی تقسیم اور عقیقہ۔',
    masail: baab14Qurbani,
  },
  {
    id: 'janazah',
    shortName: 'جنازہ',
    title: 'باب الجنازہ',
    description: 'میت کا غسل، کفن، نمازِ جنازہ، تدفین، قبر کے احکام، تعزیت اور ایصالِ ثواب۔',
    masail: baab15Janazah,
  },
  {
    id: 'khana-peena',
    shortName: 'کھانے پینے',
    title: 'باب کھانے پینے کے احکام',
    description: 'کھانے پینے کی سنتیں، حلال و حرام جانور، شرعی ذبح، شکار اور مشروبات کے مسائل۔',
    masail: baab16KhanaPeena,
  },
  {
    id: 'qasm-nazr',
    shortName: 'قسم و نذر',
    title: 'باب القسم و النذر',
    description: 'قسم کی اقسام، کفارۂ قسم، نذر و منت کی شرائط اور عہد و پیمان کے شرعی احکام۔',
    masail: baab17QasmNazr,
  },
  {
    id: 'wasiyat-wirasat',
    shortName: 'وصیت و وراثت',
    title: 'باب الوصیت و الوراثت',
    description: 'تہائی مال تک وصیت، ترکہ کی ترتیب، بیٹوں بیٹیوں، بیوہ و والدین کے شرعی حصے۔',
    masail: baab18WasiyatWirasat,
  },
  {
    id: 'akhlaq-adab',
    shortName: 'اخلاق و آداب',
    title: 'باب الاخلاق و الآداب',
    description: 'والدین و پڑوسیوں کے حقوق، سلام، مصافحہ، پردہ، لباس، غیبت و حسد سے بچاؤ اور معاشرتی آداب۔',
    masail: baab19AkhlaqAdab,
  },
];

export const ALL_MASAIL: SawalJawab[] = ABWAB.flatMap((b) => b.masail);
export const TOTAL_MASAIL_COUNT = ALL_MASAIL.length;
