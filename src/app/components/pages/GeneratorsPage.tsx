import { useState, useRef, useCallback } from 'react';
import { copyToClipboard } from '../../utils/clipboard';
import {
  Download,
  Copy,
  Check,
  Linkedin,
  Mail,
  Image as ImageIcon,
  FileText,
  Type,
  Package,
  Users,
  Plus,
  Trash2,
  Pencil,
  RotateCw,
  ChevronDown,
  ChevronUp,
  Layers,
  Clock,
  CircleCheck,
  Settings,
  Palette,
  Sparkles,
  ImagePlus,
  Upload,
  X,
  MoveHorizontal,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Eye,
  EyeOff,
} from 'lucide-react';
import { toPng } from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

/* ═══════════════════════════════════════
   BRAND DATA — single source of truth
   ═══════════════════════════════════════ */
const BRAND = {
  company: 'IntegrateWise LLP',
  companyShort: 'IntegrateWise',
  descriptor: 'The Knowledge Workspace empowered by AI and the Spine',
  descriptorShort: 'AI Knowledge Workspace',
  tagline: 'AI Thinks in Context — and Waits for Approval',
  taglineShort: 'Context-Aware AI. Approval-Controlled Work.',
  taglineExtended: 'AI Thinks in Context. Humans Stay in Control. Every Action Waits for Approval.',
  website: 'integratewise.ai',
  location: 'Bengaluru, India',
  colors: {
    primary: '#4154A3',
    primaryDark: '#364789',
    primaryLight: '#6B7DC4',
    accent: '#EB4379',
    navy: '#1B2544',
  },
  emails: {
    general: 'info@integratewise.co',
    connect: 'connect@integratewise.co',
    sales: 'sales@integratewise.co',
    support: 'support@integratewise.co',
    billing: 'billing@integratewise.co',
    careers: 'careers@integratewise.co',
    security: 'security@integratewise.co',
    marketing: 'marketing@integratewise.co',
  } as Record<string, string>,
  spineDescriptions: [
    'The Spine (SSOT)',
    'The Spine — Unified Intelligence Layer',
    'The Spine — Single Source of Truth and Unified Intelligence Layer',
  ],
  linkedinSpecialties: 'AI Workspace, Knowledge Workspace, Context-Aware AI, Enterprise AI, Human-Governed AI, Workflow Intelligence, Data Integration, Decision Intelligence',
  linkedinAbout: `IntegrateWise is a knowledge workspace powered by the Spine — a unified intelligence layer that connects tools, context, knowledge, and decisions.\n\nBy organizing operational truth into the Spine, AI can reason across systems, propose actions, and continuously learn while ensuring that every action waits for human approval.\n\nIntegrateWise brings work, knowledge, and decisions together into one governed environment where intelligence is contextual and execution remains human-controlled.`,
};

const DEFAULT_TEAM: TeamMember[] = [
  { id: '1', name: 'Nirmal Prince J', title: 'Founder & CEO', email: 'connect' },
  { id: '2', name: 'Team Member', title: 'Head of Product', email: 'connect' },
  { id: '3', name: 'Team Member', title: 'Head of Engineering', email: 'connect' },
];

const POST_TEMPLATES = [
  { id: 'thought', name: 'Thought Leadership', headline: 'AI Thinks in Context', subline: 'Workflows Should Too', bg: `linear-gradient(135deg, ${BRAND.colors.primary} 0%, ${BRAND.colors.primaryDark} 100%)` },
  { id: 'problem', name: 'Problem Statement', headline: 'Modern Work Is Fragmented', subline: 'Tools disconnected · Knowledge scattered · AI without context', bg: `linear-gradient(135deg, ${BRAND.colors.navy} 0%, #2F3D5E 100%)` },
  { id: 'solution', name: 'Solution', headline: 'IntegrateWise', subline: 'One Workspace · One Spine · Context-Aware AI · Human Approvals', bg: `linear-gradient(135deg, ${BRAND.colors.primary} 0%, ${BRAND.colors.accent} 100%)` },
  { id: 'announce', name: 'Announcement', headline: 'The Spine is Live', subline: 'A unified intelligence layer connecting tools, context, and decisions', bg: `linear-gradient(135deg, ${BRAND.colors.primaryDark} 0%, ${BRAND.colors.primary} 50%, ${BRAND.colors.primaryLight} 100%)` },
  { id: 'custom', name: 'Custom', headline: 'Your Headline Here', subline: 'Your supporting text here', bg: `linear-gradient(135deg, ${BRAND.colors.primary} 0%, ${BRAND.colors.primaryDark} 100%)` },
];

const PLATFORMS = {
  linkedin: { w: 1200, h: 627, label: 'LinkedIn' },
  instagram: { w: 1080, h: 1080, label: 'Instagram' },
  twitter: { w: 1200, h: 675, label: 'Twitter/X' },
  facebook: { w: 1200, h: 630, label: 'Facebook' },
} as const;

const BANNER_STYLES: Record<string, { bg: string; isLight: boolean; label: string }> = {
  gradient: { bg: `linear-gradient(135deg, ${BRAND.colors.primary} 0%, ${BRAND.colors.primaryDark} 50%, ${BRAND.colors.navy} 100%)`, isLight: false, label: 'Gradient' },
  dark: { bg: BRAND.colors.navy, isLight: false, label: 'Dark' },
  light: { bg: 'linear-gradient(135deg, #EDF0F5 0%, #D5DAE5 100%)', isLight: true, label: 'Light' },
  accent: { bg: `linear-gradient(135deg, ${BRAND.colors.primary} 0%, ${BRAND.colors.accent} 100%)`, isLight: false, label: 'Accent' },
};

interface TeamMember { id: string; name: string; title: string; email: string; }
interface ExportLogEntry { id: string; name: string; type: string; timestamp: number; }

/* ═══════════════════════════════════════
   WHITE LOGO SVG — for dark backgrounds
   ═══════════════════════════════════════ */
const WhiteLogo = ({ size = 48 }: { size?: number }) => (
  <svg width={size * (160 / 76)} height={size} viewBox="0 0 160 76" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M53.3869 0.205832C56.4977 -0.576671 63.4297 1.01864 66.3725 2.52462C69.871 4.04071 71.9883 6.25793 74.6863 8.91175C84.375 18.4419 81.0411 32.3964 81.633 44.6777C81.8388 48.951 81.5688 51.7248 83.1143 55.9223C84.8443 60.6378 88.3266 64.4456 92.7883 66.5011C98.0756 68.9515 103.206 68.7867 108.666 66.6229C129.922 58.1978 115.428 31.3403 123.311 14.7929C126.397 8.31589 130.804 4.48288 137.294 1.73574C139.334 0.872409 145.307 -0.448249 147.23 0.510005C148.115 0.94792 148.786 1.74212 149.086 2.70596C150.558 7.44326 142.588 6.26724 139.669 7.43049C114.438 17.485 136.673 50.6827 119.605 66.5817C115.621 70.2929 112.567 72.2206 107.31 73.8465C103.676 74.8999 99.8548 75.0664 96.1478 74.3325C91.6881 73.424 88.0153 71.1711 84.5567 68.2956C67.5173 55.219 81.3248 30.3531 71.634 15.0771C60.4727 -2.51684 33.6193 8.45363 35.7726 29.0271C36.1874 32.9917 36.5927 37.9705 33.2395 40.3015L26.0875 40.327C25.1155 42.5913 24.3717 44.5206 22.8061 46.4445C20.5773 49.1478 17.3943 50.8205 13.9648 51.0909C10.6706 51.3608 6.96223 50.0882 4.45978 47.8705C1.87388 45.5791 0.28158 42.3172 0.0364112 38.8091C-0.229912 35.0356 0.972845 31.3087 3.37836 28.4533C5.59506 25.8835 8.7141 24.3326 12.0434 24.1452C16.9115 23.8269 21.9568 26.1207 23.9305 30.6889C24.7193 32.5147 25.2537 34.2087 27.5492 34.1281C30.3194 34.3326 30.1673 30.77 29.9671 28.4424C28.7826 14.6815 38.3905 1.44619 53.3869 0.205832Z" fill="#ffffff" />
    <path d="M54.4289 24.0981C57.2918 23.9117 60.1534 24.5081 62.6015 26.0896C65.4302 27.9537 67.4361 30.8902 68.1869 34.2659C69.8061 41.6067 66.1104 48.8144 58.7958 50.4793C58.2895 57.3078 58.9545 64.3443 58.5307 71.1759C58.4181 72.9914 57.9205 73.9957 56.5214 75.0978C56.3931 75.1081 56.2648 75.1145 56.1359 75.1174C51.0795 75.2217 52.6041 66.0946 52.6752 62.4761C52.7507 58.5825 52.737 54.6875 52.6345 50.7944C50.5873 50.0704 49.4134 49.7003 47.6489 48.343C39.5366 42.1034 41.3196 28.6442 50.8118 24.9543C52.215 24.4087 52.9705 24.2882 54.4289 24.0981Z" fill="#ffffff" />
    <path d="M99.962 0.0385742C100.777 0.0494756 101.729 0.0622401 102.446 0.511322C104.346 1.70249 103.266 20.6982 104.036 24.2648C105.743 24.8311 106.854 25.2996 108.355 26.3919C111.142 28.4403 113.01 31.5636 113.534 35.0534C114.896 43.6881 110.083 49.5955 101.937 50.9023C91.7734 51.1206 85.498 42.8928 88.6263 32.6878C90.1022 27.8734 93.8406 25.7758 97.9669 23.7354C97.7641 21.2334 97.8914 17.3462 97.8638 14.7078C97.8249 10.9673 97.5441 6.60225 98.0138 2.93355C98.2122 1.38582 98.8007 0.848198 99.962 0.0385742Z" fill="#ffffff" />
    <path d="M143.213 24.2366C150.341 22.5523 157.437 27.1675 159.04 34.5294C160.642 41.8912 156.14 49.1946 148.999 50.8173C141.9 52.4304 134.874 47.8178 133.281 40.4996C131.688 33.1813 136.128 25.9112 143.213 24.2366Z" fill="rgba(255,255,255,0.85)" />
  </svg>
);

const ColorLogo = ({ size = 48 }: { size?: number }) => (
  <svg width={size * (160 / 76)} height={size} viewBox="0 0 160 76" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M53.3869 0.205832C56.4977 -0.576671 63.4297 1.01864 66.3725 2.52462C69.871 4.04071 71.9883 6.25793 74.6863 8.91175C84.375 18.4419 81.0411 32.3964 81.633 44.6777C81.8388 48.951 81.5688 51.7248 83.1143 55.9223C84.8443 60.6378 88.3266 64.4456 92.7883 66.5011C98.0756 68.9515 103.206 68.7867 108.666 66.6229C129.922 58.1978 115.428 31.3403 123.311 14.7929C126.397 8.31589 130.804 4.48288 137.294 1.73574C139.334 0.872409 145.307 -0.448249 147.23 0.510005C148.115 0.94792 148.786 1.74212 149.086 2.70596C150.558 7.44326 142.588 6.26724 139.669 7.43049C114.438 17.485 136.673 50.6827 119.605 66.5817C115.621 70.2929 112.567 72.2206 107.31 73.8465C103.676 74.8999 99.8548 75.0664 96.1478 74.3325C91.6881 73.424 88.0153 71.1711 84.5567 68.2956C67.5173 55.219 81.3248 30.3531 71.634 15.0771C60.4727 -2.51684 33.6193 8.45363 35.7726 29.0271C36.1874 32.9917 36.5927 37.9705 33.2395 40.3015L26.0875 40.327C25.1155 42.5913 24.3717 44.5206 22.8061 46.4445C20.5773 49.1478 17.3943 50.8205 13.9648 51.0909C10.6706 51.3608 6.96223 50.0882 4.45978 47.8705C1.87388 45.5791 0.28158 42.3172 0.0364112 38.8091C-0.229912 35.0356 0.972845 31.3087 3.37836 28.4533C5.59506 25.8835 8.7141 24.3326 12.0434 24.1452C16.9115 23.8269 21.9568 26.1207 23.9305 30.6889C24.7193 32.5147 25.2537 34.2087 27.5492 34.1281C30.3194 34.3326 30.1673 30.77 29.9671 28.4424C28.7826 14.6815 38.3905 1.44619 53.3869 0.205832Z" fill="#4154A3" />
    <path d="M54.4289 24.0981C57.2918 23.9117 60.1534 24.5081 62.6015 26.0896C65.4302 27.9537 67.4361 30.8902 68.1869 34.2659C69.8061 41.6067 66.1104 48.8144 58.7958 50.4793C58.2895 57.3078 58.9545 64.3443 58.5307 71.1759C58.4181 72.9914 57.9205 73.9957 56.5214 75.0978C56.3931 75.1081 56.2648 75.1145 56.1359 75.1174C51.0795 75.2217 52.6041 66.0946 52.6752 62.4761C52.7507 58.5825 52.737 54.6875 52.6345 50.7944C50.5873 50.0704 49.4134 49.7003 47.6489 48.343C39.5366 42.1034 41.3196 28.6442 50.8118 24.9543C52.215 24.4087 52.9705 24.2882 54.4289 24.0981Z" fill="#4154A3" />
    <path d="M99.962 0.0385742C100.777 0.0494756 101.729 0.0622401 102.446 0.511322C104.346 1.70249 103.266 20.6982 104.036 24.2648C105.743 24.8311 106.854 25.2996 108.355 26.3919C111.142 28.4403 113.01 31.5636 113.534 35.0534C114.896 43.6881 110.083 49.5955 101.937 50.9023C91.7734 51.1206 85.498 42.8928 88.6263 32.6878C90.1022 27.8734 93.8406 25.7758 97.9669 23.7354C97.7641 21.2334 97.8914 17.3462 97.8638 14.7078C97.8249 10.9673 97.5441 6.60225 98.0138 2.93355C98.2122 1.38582 98.8007 0.848198 99.962 0.0385742Z" fill="#4154A3" />
    <path d="M143.213 24.2366C150.341 22.5523 157.437 27.1675 159.04 34.5294C160.642 41.8912 156.14 49.1946 148.999 50.8173C141.9 52.4304 134.874 47.8178 133.281 40.4996C131.688 33.1813 136.128 25.9112 143.213 24.2366Z" fill="#EB4379" />
  </svg>
);

/* ═══════════════════════════════════════
   SHARED HELPERS
   ═══════════════════════════════════════ */
function useCopy() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const copy = useCallback((id: string, text: string) => {
    copyToClipboard(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);
  return { copiedId, copy };
}

function CopyBtn({ id, text, copiedId, copy, label }: {
  id: string; text: string; copiedId: string | null;
  copy: (id: string, text: string) => void; label?: string;
}) {
  const isCopied = copiedId === id;
  return (
    <button onClick={() => copy(id, text)}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0"
      style={{ background: isCopied ? '#10B981' : 'rgba(65,84,163,0.08)', color: isCopied ? '#fff' : '#4154A3' }}>
      {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {label || (isCopied ? 'Copied!' : 'Copy')}
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] tracking-wider mb-2" style={{ color: '#9BA8C2' }}>{children}</p>;
}

function addToLog(setLog: React.Dispatch<React.SetStateAction<ExportLogEntry[]>>, entry: Omit<ExportLogEntry, 'id' | 'timestamp'>) {
  setLog(prev => [{ ...entry, id: crypto.randomUUID(), timestamp: Date.now() }, ...prev].slice(0, 20));
}

/* ═══════════════════════════════════════
   ADVANCED EDIT PANEL (reusable)
   ═══════════════════════════════════════ */
interface AdvancedEditState {
  bgType: 'preset' | 'solid' | 'gradient';
  bgColor: string;
  bgGradStart: string;
  bgGradEnd: string;
  bgGradAngle: number;
  textColor: string;
  subTextColor: string;
  fontSize: number;
  subFontSize: number;
  textAlign: 'left' | 'center' | 'right';
  paddingX: number;
  paddingY: number;
  logoSize: number;
  logoVisible: boolean;
  shadowEnabled: boolean;
  shadowBlur: number;
  overlayOpacity: number;
  cornerRadius: number;
  customImage: string | null;
  imageOpacity: number;
  imagePosition: 'cover' | 'right' | 'left' | 'top';
}

const DEFAULT_EDIT_STATE: AdvancedEditState = {
  bgType: 'preset',
  bgColor: BRAND.colors.primary,
  bgGradStart: BRAND.colors.primary,
  bgGradEnd: BRAND.colors.navy,
  bgGradAngle: 135,
  textColor: '#ffffff',
  subTextColor: 'rgba(255,255,255,0.75)',
  fontSize: 100,
  subFontSize: 100,
  textAlign: 'center',
  paddingX: 80,
  paddingY: 60,
  logoSize: 100,
  logoVisible: true,
  shadowEnabled: false,
  shadowBlur: 20,
  overlayOpacity: 0,
  cornerRadius: 0,
  customImage: null,
  imageOpacity: 30,
  imagePosition: 'cover',
};

function AdvancedEditPanel({
  state,
  onChange,
  showTextControls = true,
  showImageUpload = true,
}: {
  state: AdvancedEditState;
  onChange: (s: AdvancedEditState) => void;
  showTextControls?: boolean;
  showImageUpload?: boolean;
}) {
  const [openSection, setOpenSection] = useState<string | null>('colors');
  const fileRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof AdvancedEditState>(key: K, val: AdvancedEditState[K]) => {
    onChange({ ...state, [key]: val });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => set('customImage', reader.result as string);
    reader.readAsDataURL(file);
  };

  const sections = [
    { id: 'colors', label: 'Colors & Background', icon: Palette },
    ...(showTextControls ? [{ id: 'text', label: 'Typography', icon: Type }] : []),
    { id: 'layout', label: 'Layout & Logo', icon: MoveHorizontal },
    { id: 'effects', label: 'Effects', icon: Sparkles },
    ...(showImageUpload ? [{ id: 'image', label: 'Background Image', icon: ImagePlus }] : []),
  ];

  const toggleSection = (id: string) => setOpenSection(openSection === id ? null : id);

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E8ECF2', background: '#FAFBFD' }}>
      <div className="px-4 py-3 flex items-center gap-2" style={{ background: '#F0F2F7', borderBottom: '1px solid #E8ECF2' }}>
        <Settings className="w-3.5 h-3.5" style={{ color: '#4154A3' }} />
        <span className="text-xs font-semibold" style={{ color: '#1B2544' }}>Advanced Edit</span>
        <button onClick={() => onChange({ ...DEFAULT_EDIT_STATE })}
          className="ml-auto text-[10px] px-2 py-0.5 rounded font-medium" style={{ color: '#9BA8C2' }}>
          Reset
        </button>
      </div>

      {sections.map(sec => (
        <div key={sec.id}>
          <button onClick={() => toggleSection(sec.id)}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-medium transition-colors hover:bg-[#F0F2F7]"
            style={{ borderBottom: '1px solid #E8ECF2', color: openSection === sec.id ? '#4154A3' : '#5F6E93' }}>
            <sec.icon className="w-3.5 h-3.5" />
            <span className="flex-1 text-left">{sec.label}</span>
            {openSection === sec.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {openSection === sec.id && (
            <div className="px-4 py-3 space-y-3" style={{ borderBottom: '1px solid #E8ECF2' }}>
              {sec.id === 'colors' && (
                <>
                  <div>
                    <label className="text-[11px] font-medium block mb-1.5" style={{ color: '#5F6E93' }}>Background Mode</label>
                    <div className="flex gap-1.5">
                      {(['preset', 'solid', 'gradient'] as const).map(t => (
                        <button key={t} onClick={() => set('bgType', t)}
                          className="flex-1 px-2 py-1.5 rounded text-[11px] font-medium transition-colors"
                          style={state.bgType === t ? { background: '#4154A3', color: '#fff' } : { background: '#F0F2F7', color: '#5F6E93' }}>
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  {state.bgType === 'solid' && (
                    <ColorPicker label="Background" value={state.bgColor} onChange={v => set('bgColor', v)} />
                  )}
                  {state.bgType === 'gradient' && (
                    <>
                      <ColorPicker label="Start Color" value={state.bgGradStart} onChange={v => set('bgGradStart', v)} />
                      <ColorPicker label="End Color" value={state.bgGradEnd} onChange={v => set('bgGradEnd', v)} />
                      <SliderInput label="Angle" value={state.bgGradAngle} min={0} max={360} unit="°" onChange={v => set('bgGradAngle', v)} />
                    </>
                  )}
                  <ColorPicker label="Text Color" value={state.textColor} onChange={v => set('textColor', v)} />
                  <ColorPicker label="Subtext Color" value={state.subTextColor} onChange={v => set('subTextColor', v)} />
                </>
              )}

              {sec.id === 'text' && (
                <>
                  <SliderInput label="Headline Size" value={state.fontSize} min={50} max={200} unit="%" onChange={v => set('fontSize', v)} />
                  <SliderInput label="Subtext Size" value={state.subFontSize} min={50} max={200} unit="%" onChange={v => set('subFontSize', v)} />
                  <div>
                    <label className="text-[11px] font-medium block mb-1.5" style={{ color: '#5F6E93' }}>Text Align</label>
                    <div className="flex gap-1.5">
                      {([
                        { val: 'left' as const, icon: AlignLeft },
                        { val: 'center' as const, icon: AlignCenter },
                        { val: 'right' as const, icon: AlignRight },
                      ]).map(a => (
                        <button key={a.val} onClick={() => set('textAlign', a.val)}
                          className="flex-1 flex items-center justify-center py-1.5 rounded transition-colors"
                          style={state.textAlign === a.val ? { background: '#4154A3', color: '#fff' } : { background: '#F0F2F7', color: '#5F6E93' }}>
                          <a.icon className="w-3.5 h-3.5" />
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {sec.id === 'layout' && (
                <>
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-medium" style={{ color: '#5F6E93' }}>Show Logo</label>
                    <button onClick={() => set('logoVisible', !state.logoVisible)}
                      className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium"
                      style={{ background: state.logoVisible ? 'rgba(65,84,163,0.1)' : '#F0F2F7', color: state.logoVisible ? '#4154A3' : '#9BA8C2' }}>
                      {state.logoVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {state.logoVisible ? 'Visible' : 'Hidden'}
                    </button>
                  </div>
                  {state.logoVisible && (
                    <SliderInput label="Logo Size" value={state.logoSize} min={30} max={200} unit="%" onChange={v => set('logoSize', v)} />
                  )}
                  <SliderInput label="Padding X" value={state.paddingX} min={0} max={200} unit="px" onChange={v => set('paddingX', v)} />
                  <SliderInput label="Padding Y" value={state.paddingY} min={0} max={200} unit="px" onChange={v => set('paddingY', v)} />
                </>
              )}

              {sec.id === 'effects' && (
                <>
                  <SliderInput label="Overlay Darken" value={state.overlayOpacity} min={0} max={80} unit="%" onChange={v => set('overlayOpacity', v)} />
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-medium" style={{ color: '#5F6E93' }}>Drop Shadow</label>
                    <button onClick={() => set('shadowEnabled', !state.shadowEnabled)}
                      className="px-2 py-1 rounded text-[11px] font-medium"
                      style={{ background: state.shadowEnabled ? '#4154A3' : '#F0F2F7', color: state.shadowEnabled ? '#fff' : '#9BA8C2' }}>
                      {state.shadowEnabled ? 'On' : 'Off'}
                    </button>
                  </div>
                  {state.shadowEnabled && (
                    <SliderInput label="Shadow Blur" value={state.shadowBlur} min={0} max={80} unit="px" onChange={v => set('shadowBlur', v)} />
                  )}
                  <SliderInput label="Corner Radius" value={state.cornerRadius} min={0} max={40} unit="px" onChange={v => set('cornerRadius', v)} />
                </>
              )}

              {sec.id === 'image' && (
                <>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  {state.customImage ? (
                    <div className="space-y-2">
                      <div className="relative rounded-lg overflow-hidden" style={{ border: '1px solid #D5DAE5' }}>
                        <img src={state.customImage} alt="" className="w-full h-20 object-cover" />
                        <button onClick={() => set('customImage', null)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-black/50 text-white">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      <SliderInput label="Image Opacity" value={state.imageOpacity} min={5} max={100} unit="%" onChange={v => set('imageOpacity', v)} />
                      <div>
                        <label className="text-[11px] font-medium block mb-1.5" style={{ color: '#5F6E93' }}>Position</label>
                        <div className="flex gap-1.5">
                          {(['cover', 'right', 'left'] as const).map(p => (
                            <button key={p} onClick={() => set('imagePosition', p)}
                              className="flex-1 px-2 py-1.5 rounded text-[11px] font-medium"
                              style={state.imagePosition === p ? { background: '#4154A3', color: '#fff' } : { background: '#F0F2F7', color: '#5F6E93' }}>
                              {p.charAt(0).toUpperCase() + p.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => fileRef.current?.click()}
                      className="w-full flex items-center justify-center gap-2 px-4 py-6 rounded-lg text-xs font-medium transition-colors"
                      style={{ border: '2px dashed #D5DAE5', color: '#9BA8C2' }}>
                      <Upload className="w-4 h-4" /> Upload Background Image
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-[11px] font-medium block mb-1" style={{ color: '#5F6E93' }}>{label}</label>
      <div className="flex items-center gap-2">
        <input type="color" value={value.startsWith('rgba') ? '#ffffff' : value} onChange={e => onChange(e.target.value)}
          className="w-8 h-7 rounded border-0 cursor-pointer" style={{ padding: 0 }} />
        <input type="text" value={value} onChange={e => onChange(e.target.value)}
          className="flex-1 px-2 py-1 text-[11px] rounded focus:outline-none focus:ring-1 focus:ring-[#4154A3]/30"
          style={{ border: '1px solid #D5DAE5', color: '#1B2544' }} />
      </div>
    </div>
  );
}

function SliderInput({ label, value, min, max, unit, onChange }: {
  label: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-[11px] font-medium" style={{ color: '#5F6E93' }}>{label}</label>
        <span className="text-[10px] font-mono" style={{ color: '#9BA8C2' }}>{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: '#4154A3' }} />
    </div>
  );
}

/* ═══════════════════════════════════════
   COMPUTE BG STYLE from edit state
   ═══════════════════════════════════════ */
function computeBgStyle(state: AdvancedEditState, presetBg?: string): React.CSSProperties {
  if (state.bgType === 'preset' && presetBg) return { background: presetBg };
  if (state.bgType === 'solid') return { background: state.bgColor };
  if (state.bgType === 'gradient') return { background: `linear-gradient(${state.bgGradAngle}deg, ${state.bgGradStart}, ${state.bgGradEnd})` };
  return { background: presetBg || BRAND.colors.primary };
}

function isDarkBg(state: AdvancedEditState, presetIsLight?: boolean): boolean {
  if (state.bgType === 'preset') return presetIsLight === false;
  if (state.bgType === 'solid') {
    const hex = state.bgColor.replace('#', '');
    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return (r * 299 + g * 587 + b * 114) / 1000 < 128;
    }
  }
  return true;
}

/* ═══════════════════════════════════════
   1. CAMPAIGN KIT GENERATOR
   ═══════════════════════════════════════ */
function CampaignKitGenerator({ team, setExportLog }: {
  team: TeamMember[];
  setExportLog: React.Dispatch<React.SetStateAction<ExportLogEntry[]>>;
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState('');
  const [selectedItems, setSelectedItems] = useState({
    banners: true, socialPosts: true, emailSignatures: true, contactBlocks: true, copyLibrary: true,
  });

  const toggle = (key: keyof typeof selectedItems) => setSelectedItems(prev => ({ ...prev, [key]: !prev[key] }));
  const selectedCount = Object.values(selectedItems).filter(Boolean).length;

  const generateKit = async () => {
    setIsGenerating(true);
    const zip = new JSZip();
    const kit = zip.folder('IntegrateWise_Campaign_Kit')!;
    try {
      if (selectedItems.banners) {
        setProgress('Generating LinkedIn banners...');
        const f = kit.folder('01_LinkedIn_Banners')!;
        for (const [styleName, styleData] of Object.entries(BANNER_STYLES)) {
          const canvas = document.createElement('canvas');
          canvas.width = 1584; canvas.height = 396;
          const ctx = canvas.getContext('2d')!;
          if (styleName === 'dark') { ctx.fillStyle = BRAND.colors.navy; }
          else {
            const grad = ctx.createLinearGradient(0, 0, 1584, 396);
            if (styleName === 'gradient') { grad.addColorStop(0, BRAND.colors.primary); grad.addColorStop(0.5, BRAND.colors.primaryDark); grad.addColorStop(1, BRAND.colors.navy); }
            else if (styleName === 'accent') { grad.addColorStop(0, BRAND.colors.primary); grad.addColorStop(1, BRAND.colors.accent); }
            else { grad.addColorStop(0, '#EDF0F5'); grad.addColorStop(1, '#D5DAE5'); }
            ctx.fillStyle = grad;
          }
          ctx.fillRect(0, 0, 1584, 396);
          ctx.fillStyle = styleData.isLight ? BRAND.colors.navy : '#fff';
          ctx.font = '700 42px system-ui, sans-serif'; ctx.fillText('IntegrateWise', 80, 180);
          ctx.globalAlpha = styleData.isLight ? 1 : 0.75;
          ctx.fillStyle = styleData.isLight ? '#5F6E93' : '#fff';
          ctx.font = '400 18px system-ui, sans-serif'; ctx.fillText(BRAND.descriptor, 80, 212);
          ctx.globalAlpha = styleData.isLight ? 1 : 0.6;
          ctx.fillStyle = styleData.isLight ? BRAND.colors.primary : '#fff';
          ctx.font = '400 14px system-ui, sans-serif'; ctx.fillText(BRAND.tagline, 80, 260);
          ctx.globalAlpha = 1;
          const blob = await new Promise<Blob>(r => canvas.toBlob(b => r(b!), 'image/png'));
          f.file(`linkedin-banner-${styleName}.png`, blob);
        }
      }
      if (selectedItems.socialPosts) {
        setProgress('Generating social media posts...');
        const f = kit.folder('02_Social_Posts')!;
        for (const tmpl of POST_TEMPLATES.filter(t => t.id !== 'custom')) {
          for (const [pKey, pVal] of Object.entries(PLATFORMS)) {
            const canvas = document.createElement('canvas');
            canvas.width = pVal.w; canvas.height = pVal.h;
            const ctx = canvas.getContext('2d')!;
            const grad = ctx.createLinearGradient(0, 0, pVal.w, pVal.h);
            grad.addColorStop(0, BRAND.colors.primary); grad.addColorStop(1, BRAND.colors.primaryDark);
            ctx.fillStyle = grad; ctx.fillRect(0, 0, pVal.w, pVal.h);
            ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
            ctx.font = `700 ${pVal.w > 1100 ? 52 : 44}px system-ui, sans-serif`;
            ctx.fillText(tmpl.headline, pVal.w / 2, pVal.h / 2 - 20);
            ctx.globalAlpha = 0.75; ctx.font = `400 ${pVal.w > 1100 ? 20 : 18}px system-ui, sans-serif`;
            ctx.fillText(tmpl.subline, pVal.w / 2, pVal.h / 2 + 30);
            ctx.globalAlpha = 0.4; ctx.font = '400 13px system-ui, sans-serif';
            ctx.fillText('integratewise.ai', pVal.w / 2, pVal.h - 30); ctx.globalAlpha = 1;
            const blob = await new Promise<Blob>(r => canvas.toBlob(b => r(b!), 'image/png'));
            f.file(`${pKey}-${tmpl.id}.png`, blob);
          }
        }
      }
      if (selectedItems.emailSignatures) {
        setProgress('Generating email signatures...');
        const f = kit.folder('03_Email_Signatures')!;
        for (const m of team) {
          const ea = BRAND.emails[m.email] || m.email;
          f.file(`${m.name.replace(/\s+/g, '_')}_signature.html`, buildSignatureHtml(m.name, m.title, ea));
          f.file(`${m.name.replace(/\s+/g, '_')}_signature.txt`, buildSignaturePlain(m.name, m.title, ea));
        }
      }
      if (selectedItems.contactBlocks) {
        setProgress('Generating contact blocks...');
        const f = kit.folder('04_Contact_Blocks')!;
        f.file('corporate_block.txt', `${BRAND.company}\n${BRAND.descriptor}\n\n${BRAND.tagline}\n\n${BRAND.location}\nWebsite: ${BRAND.website}\n\nGeneral: ${BRAND.emails.general}\nContact: ${BRAND.emails.connect}\nSupport: ${BRAND.emails.support}`);
        f.file('website_footer.txt', `${BRAND.company} · ${BRAND.descriptor}\n${BRAND.tagline}\n${BRAND.location} · ${BRAND.website}`);
        f.file('linkedin_about.txt', BRAND.linkedinAbout);
      }
      if (selectedItems.copyLibrary) {
        setProgress('Generating copy library...');
        const f = kit.folder('05_Copy_Library')!;
        let all = `INTEGRATEWISE BRAND COPY LIBRARY\n${'='.repeat(40)}\n\n`;
        all += `PRIMARY TAGLINE\n${BRAND.tagline}\n\nSHORT TAGLINE\n${BRAND.taglineShort}\n\nDESCRIPTOR\n${BRAND.descriptor}\n\n`;
        all += `SPINE DESCRIPTIONS\n${BRAND.spineDescriptions.join('\n')}\n\nEMAIL ALIASES\n${Object.entries(BRAND.emails).map(([k, v]) => `${k}: ${v}`).join('\n')}\n`;
        f.file('brand_copy_library.txt', all);
      }
      setProgress('Zipping...');
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `IntegrateWise_Campaign_Kit_${new Date().toISOString().slice(0, 10)}.zip`);
      addToLog(setExportLog, { name: 'Full Campaign Kit', type: 'ZIP' });
    } catch (err) { console.error(err); }
    finally { setIsGenerating(false); setProgress(''); }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl p-5" style={{ background: 'linear-gradient(135deg, rgba(65,84,163,0.06), rgba(235,67,121,0.06))', border: '1px solid rgba(65,84,163,0.12)' }}>
        <div className="flex items-center gap-2 mb-1">
          <Package className="w-4 h-4" style={{ color: '#EB4379' }} />
          <p className="text-sm font-semibold" style={{ color: '#1B2544' }}>One-Click Campaign Kit</p>
        </div>
        <p className="text-xs" style={{ color: '#5F6E93' }}>
          Complete ZIP: banners ({Object.keys(BANNER_STYLES).length} styles), social posts ({(POST_TEMPLATES.length - 1) * Object.keys(PLATFORMS).length} images), signatures ({team.length} members), contact blocks, and copy library.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {([
          { key: 'banners' as const, label: 'LinkedIn Banners', count: `${Object.keys(BANNER_STYLES).length} styles`, icon: Linkedin },
          { key: 'socialPosts' as const, label: 'Social Posts', count: `${(POST_TEMPLATES.length - 1) * Object.keys(PLATFORMS).length} images`, icon: ImageIcon },
          { key: 'emailSignatures' as const, label: 'Email Signatures', count: `${team.length} members`, icon: Mail },
          { key: 'contactBlocks' as const, label: 'Contact Blocks', count: '5 blocks', icon: FileText },
          { key: 'copyLibrary' as const, label: 'Copy Library', count: 'All copy', icon: Type },
        ]).map(item => (
          <button key={item.key} onClick={() => toggle(item.key)}
            className="flex items-center gap-3 p-3 rounded-lg text-left transition-all"
            style={{ background: selectedItems[item.key] ? 'rgba(65,84,163,0.06)' : '#F0F2F7', border: selectedItems[item.key] ? '1.5px solid #4154A3' : '1.5px solid transparent' }}>
            <div className="w-5 h-5 rounded flex items-center justify-center shrink-0" style={{ background: selectedItems[item.key] ? '#4154A3' : '#D5DAE5' }}>
              {selectedItems[item.key] && <Check className="w-3 h-3 text-white" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium" style={{ color: '#1B2544' }}>{item.label}</p>
              <p className="text-[10px]" style={{ color: '#9BA8C2' }}>{item.count}</p>
            </div>
          </button>
        ))}
      </div>
      <button onClick={generateKit} disabled={isGenerating || selectedCount === 0}
        className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all w-full justify-center"
        style={{ background: isGenerating ? '#9BA8C2' : 'linear-gradient(135deg, #4154A3, #EB4379)' }}>
        {isGenerating ? <RotateCw className="w-4 h-4 animate-spin" /> : <Package className="w-4 h-4" />}
        {isGenerating ? progress || 'Generating...' : `Generate Campaign Kit (${selectedCount} categories)`}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════
   2. LINKEDIN BANNER GENERATOR
   ═══════════════════════════════════════ */
function LinkedInBannerGenerator({ setExportLog }: { setExportLog: React.Dispatch<React.SetStateAction<ExportLogEntry[]>> }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isBatch, setIsBatch] = useState(false);
  const [style, setStyle] = useState<keyof typeof BANNER_STYLES>('gradient');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [editState, setEditState] = useState<AdvancedEditState>({ ...DEFAULT_EDIT_STATE, textAlign: 'left' });
  const [editTitle, setEditTitle] = useState(BRAND.companyShort);
  const [editSubtitle, setEditSubtitle] = useState(BRAND.descriptor);
  const [editTagline, setEditTagline] = useState(BRAND.tagline);

  const styleData = BANNER_STYLES[style];
  const dark = editState.bgType === 'preset' ? !styleData.isLight : isDarkBg(editState);
  const textColor = editState.bgType !== 'preset' ? editState.textColor : (dark ? '#ffffff' : BRAND.colors.navy);
  const subColor = editState.bgType !== 'preset' ? editState.subTextColor : (dark ? 'rgba(255,255,255,0.75)' : '#5F6E93');
  const tagColor = dark ? 'rgba(255,255,255,0.6)' : BRAND.colors.primary;
  const nodeColor = dark ? '#ffffff' : BRAND.colors.primary;
  const bgStyle = computeBgStyle(editState, styleData.bg);
  const baseFontScale = editState.fontSize / 100;
  const subFontScale = editState.subFontSize / 100;
  const logoScale = editState.logoSize / 100;

  const handleExport = async () => {
    if (!ref.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(ref.current, { pixelRatio: 2, cacheBust: true, width: 1584, height: 396 });
      const a = document.createElement('a'); a.href = dataUrl;
      a.download = `IntegrateWise-LinkedIn-Banner-${style}.png`; a.click();
      addToLog(setExportLog, { name: `LinkedIn Banner (${style})`, type: 'PNG' });
    } catch (err) { console.error(err); } finally { setIsExporting(false); }
  };

  const batchExport = async () => {
    setIsBatch(true);
    try {
      const zip = new JSZip();
      for (const [sn, sd] of Object.entries(BANNER_STYLES)) {
        const canvas = document.createElement('canvas'); canvas.width = 1584; canvas.height = 396;
        const ctx = canvas.getContext('2d')!;
        if (sn === 'dark') { ctx.fillStyle = BRAND.colors.navy; }
        else { const g = ctx.createLinearGradient(0,0,1584,396); if(sn==='gradient'){g.addColorStop(0,BRAND.colors.primary);g.addColorStop(.5,BRAND.colors.primaryDark);g.addColorStop(1,BRAND.colors.navy)}else if(sn==='accent'){g.addColorStop(0,BRAND.colors.primary);g.addColorStop(1,BRAND.colors.accent)}else{g.addColorStop(0,'#EDF0F5');g.addColorStop(1,'#D5DAE5')}ctx.fillStyle=g; }
        ctx.fillRect(0,0,1584,396);
        ctx.fillStyle = sd.isLight ? BRAND.colors.navy : '#fff';
        ctx.font = '700 42px system-ui'; ctx.fillText(editTitle, 80, 180);
        ctx.globalAlpha = sd.isLight ? 1 : .75; ctx.fillStyle = sd.isLight ? '#5F6E93' : '#fff';
        ctx.font = '400 18px system-ui'; ctx.fillText(editSubtitle, 80, 212);
        ctx.globalAlpha = sd.isLight ? 1 : .6; ctx.fillStyle = sd.isLight ? BRAND.colors.primary : '#fff';
        ctx.font = '400 14px system-ui'; ctx.fillText(editTagline, 80, 260); ctx.globalAlpha = 1;
        const blob = await new Promise<Blob>(r => canvas.toBlob(b => r(b!), 'image/png'));
        zip.file(`linkedin-banner-${sn}.png`, blob);
      }
      saveAs(await zip.generateAsync({ type: 'blob' }), 'IntegrateWise-LinkedIn-Banners-All.zip');
      addToLog(setExportLog, { name: 'All LinkedIn Banners', type: 'ZIP' });
    } catch(e){console.error(e)} finally { setIsBatch(false); }
  };

  return (
    <div className="space-y-4">
      {/* Style Selector */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-medium" style={{ color: '#7B8AAD' }}>Style:</span>
        {(Object.entries(BANNER_STYLES)).map(([k, v]) => (
          <button key={k} onClick={() => setStyle(k as any)}
            className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
            style={style === k ? { background: '#4154A3', color: '#fff' } : { background: '#F0F2F7', color: '#5F6E93' }}>
            {v.label}
          </button>
        ))}
      </div>

      {/* Editable Text Fields */}
      <div className="grid sm:grid-cols-3 gap-3 p-4 rounded-lg" style={{ background: '#F7F8FB', border: '1px solid #E8ECF2' }}>
        <div>
          <label className="text-[11px] font-medium block mb-1" style={{ color: '#5F6E93' }}>Title</label>
          <input value={editTitle} onChange={e => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4154A3]/30"
            style={{ border: '1px solid #D5DAE5', color: '#1B2544' }} />
        </div>
        <div>
          <label className="text-[11px] font-medium block mb-1" style={{ color: '#5F6E93' }}>Subtitle</label>
          <input value={editSubtitle} onChange={e => setEditSubtitle(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4154A3]/30"
            style={{ border: '1px solid #D5DAE5', color: '#1B2544' }} />
        </div>
        <div>
          <label className="text-[11px] font-medium block mb-1" style={{ color: '#5F6E93' }}>Tagline</label>
          <input value={editTagline} onChange={e => setEditTagline(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4154A3]/30"
            style={{ border: '1px solid #D5DAE5', color: '#1B2544' }} />
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #D5DAE5', boxShadow: editState.shadowEnabled ? `0 4px ${editState.shadowBlur}px rgba(0,0,0,0.1)` : undefined }}>
        <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: '200%', height: 0, paddingBottom: '12.5%' }}>
          <div ref={ref} style={{
            width: 1584, height: 396, ...bgStyle,
            position: 'relative', display: 'flex', alignItems: 'center',
            padding: `0 ${editState.paddingX}px`,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            borderRadius: editState.cornerRadius,
            overflow: 'hidden',
          }}>
            {/* Background image */}
            {editState.customImage && (
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${editState.customImage})`,
                backgroundSize: editState.imagePosition === 'cover' ? 'cover' : '50%',
                backgroundPosition: editState.imagePosition === 'right' ? 'right center' : editState.imagePosition === 'left' ? 'left center' : 'center',
                backgroundRepeat: 'no-repeat',
                opacity: editState.imageOpacity / 100,
              }} />
            )}
            {/* Overlay */}
            {editState.overlayOpacity > 0 && (
              <div style={{ position: 'absolute', inset: 0, background: `rgba(0,0,0,${editState.overlayOpacity / 100})` }} />
            )}

            <div style={{ flex: 1, zIndex: 1 }}>
              {editState.logoVisible && (
                <div style={{ marginBottom: 20, transform: `scale(${logoScale})`, transformOrigin: 'left center' }}>
                  {dark ? <WhiteLogo size={48} /> : <ColorLogo size={48} />}
                </div>
              )}
              <p style={{ fontSize: 42 * baseFontScale, fontWeight: 700, color: textColor, lineHeight: 1.2, letterSpacing: -0.5 }}>{editTitle}</p>
              <p style={{ fontSize: 18 * subFontScale, color: subColor, marginTop: 8, lineHeight: 1.4 }}>{editSubtitle}</p>
              <p style={{ fontSize: 14 * subFontScale, color: tagColor, marginTop: 24, letterSpacing: 0.5 }}>{editTagline}</p>
            </div>

            {/* Spine network */}
            <div style={{ position: 'absolute', right: 60, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
              <svg width="280" height="280" viewBox="0 0 280 280" fill="none">
                {[[140,140,60,60],[140,140,220,60],[140,140,60,220],[140,140,220,220],[140,140,40,140],[140,140,240,140],[140,140,140,30],[140,140,140,250]].map(([x1,y1,x2,y2],i) =>
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={nodeColor} strokeWidth="1.5" opacity="0.3" />
                )}
                {[[60,60],[220,60],[60,220],[220,220],[40,140],[240,140],[140,30],[140,250]].map(([cx,cy],i) =>
                  <circle key={i} cx={cx} cy={cy} r="8" fill={nodeColor} opacity="0.25" />
                )}
                <circle cx="140" cy="140" r="50" fill="none" stroke={nodeColor} strokeWidth="1" opacity="0.15" />
                <circle cx="140" cy="140" r="20" fill={nodeColor} opacity="0.4" />
                <circle cx="140" cy="140" r="8" fill="#EB4379" opacity="0.9" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Edit Toggle */}
      <button onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg transition-colors"
        style={{ background: showAdvanced ? 'rgba(65,84,163,0.1)' : '#F0F2F7', color: showAdvanced ? '#4154A3' : '#5F6E93' }}>
        <Settings className="w-3.5 h-3.5" /> Advanced Edit
        {showAdvanced ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>
      {showAdvanced && <AdvancedEditPanel state={editState} onChange={setEditState} />}

      {/* Actions */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={handleExport} disabled={isExporting}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white transition-all"
          style={{ background: isExporting ? '#9BA8C2' : '#4154A3' }}>
          <Download className="w-3.5 h-3.5" /> {isExporting ? 'Exporting...' : 'Download This Style (1584x396)'}
        </button>
        <button onClick={batchExport} disabled={isBatch}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all"
          style={{ background: isBatch ? '#9BA8C2' : '#F0F2F7', color: isBatch ? '#fff' : '#4154A3' }}>
          <Layers className="w-3.5 h-3.5" /> {isBatch ? 'Zipping...' : 'Batch Export All 4 Styles (.zip)'}
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   3. SOCIAL POST GENERATOR
   ═══════════════════════════════════════ */
function SocialPostGenerator({ setExportLog }: { setExportLog: React.Dispatch<React.SetStateAction<ExportLogEntry[]>> }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isBatch, setIsBatch] = useState(false);
  const [templateIdx, setTemplateIdx] = useState(0);
  const [platform, setPlatform] = useState<keyof typeof PLATFORMS>('linkedin');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [editState, setEditState] = useState<AdvancedEditState>({ ...DEFAULT_EDIT_STATE });

  // Editable text for ALL templates
  const [headlines, setHeadlines] = useState<Record<number, string>>({});
  const [sublines, setSublines] = useState<Record<number, string>>({});

  const tmpl = POST_TEMPLATES[templateIdx];
  const headline = headlines[templateIdx] ?? tmpl.headline;
  const subline = sublines[templateIdx] ?? tmpl.subline;
  const size = PLATFORMS[platform];
  const bgStyle = computeBgStyle(editState, tmpl.bg);
  const baseFontScale = editState.fontSize / 100;
  const subFontScale = editState.subFontSize / 100;
  const logoScale = editState.logoSize / 100;
  const dark = isDarkBg(editState, true);

  const setHeadline = (v: string) => setHeadlines(prev => ({ ...prev, [templateIdx]: v }));
  const setSubline = (v: string) => setSublines(prev => ({ ...prev, [templateIdx]: v }));

  const exportSingle = async () => {
    if (!ref.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(ref.current, { pixelRatio: 2, cacheBust: true, width: size.w, height: size.h });
      const a = document.createElement('a'); a.href = dataUrl;
      a.download = `IntegrateWise-${platform}-${tmpl.id}.png`; a.click();
      addToLog(setExportLog, { name: `${size.label} - ${tmpl.name}`, type: 'PNG' });
    } catch (err) { console.error(err); } finally { setIsExporting(false); }
  };

  const batchExport = async () => {
    setIsBatch(true);
    try {
      const zip = new JSZip();
      for (const [pKey, pVal] of Object.entries(PLATFORMS)) {
        const canvas = document.createElement('canvas'); canvas.width = pVal.w; canvas.height = pVal.h;
        const ctx = canvas.getContext('2d')!;
        const g = ctx.createLinearGradient(0, 0, pVal.w, pVal.h);
        g.addColorStop(0, BRAND.colors.primary); g.addColorStop(1, BRAND.colors.primaryDark);
        ctx.fillStyle = g; ctx.fillRect(0, 0, pVal.w, pVal.h);
        ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
        ctx.font = `700 ${pVal.w > 1100 ? 52 : 44}px system-ui`;
        ctx.fillText(headline, pVal.w / 2, pVal.h / 2 - 20);
        ctx.globalAlpha = .75; ctx.font = `400 ${pVal.w > 1100 ? 20 : 18}px system-ui`;
        // wrap text
        const words = subline.split(' '); let lines: string[] = []; let cur = '';
        for (const w of words) { if (ctx.measureText(cur + w).width > pVal.w - 160) { lines.push(cur.trim()); cur = w + ' '; } else cur += w + ' '; }
        if (cur.trim()) lines.push(cur.trim());
        lines.forEach((l, i) => ctx.fillText(l, pVal.w / 2, pVal.h / 2 + 30 + i * 28));
        ctx.globalAlpha = .4; ctx.font = '400 13px system-ui';
        ctx.fillText('integratewise.ai', pVal.w / 2, pVal.h - 30); ctx.globalAlpha = 1;
        const blob = await new Promise<Blob>(r => canvas.toBlob(b => r(b!), 'image/png'));
        zip.file(`${pKey}-${tmpl.id}.png`, blob);
      }
      saveAs(await zip.generateAsync({ type: 'blob' }), `IntegrateWise-${tmpl.id}-all-platforms.zip`);
      addToLog(setExportLog, { name: `${tmpl.name} (All)`, type: 'ZIP' });
    } catch(e){console.error(e)} finally { setIsBatch(false); }
  };

  return (
    <div className="space-y-4">
      {/* Template picker */}
      <div className="flex flex-wrap gap-2">
        {POST_TEMPLATES.map((t, i) => (
          <button key={t.id} onClick={() => setTemplateIdx(i)}
            className="px-3 py-1.5 rounded-md text-xs font-medium transition-all"
            style={templateIdx === i ? { background: '#4154A3', color: '#fff' } : { background: '#F0F2F7', color: '#5F6E93' }}>
            {t.name}
          </button>
        ))}
      </div>

      {/* Editable text — available for ALL templates */}
      <div className="grid sm:grid-cols-2 gap-3 p-4 rounded-lg" style={{ background: '#F7F8FB', border: '1px solid #E8ECF2' }}>
        <div>
          <label className="text-[11px] font-medium block mb-1" style={{ color: '#5F6E93' }}>Headline</label>
          <input value={headline} onChange={e => setHeadline(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4154A3]/30"
            style={{ border: '1px solid #D5DAE5', color: '#1B2544' }} />
        </div>
        <div>
          <label className="text-[11px] font-medium block mb-1" style={{ color: '#5F6E93' }}>Supporting Text</label>
          <input value={subline} onChange={e => setSubline(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4154A3]/30"
            style={{ border: '1px solid #D5DAE5', color: '#1B2544' }} />
        </div>
      </div>

      {/* Platform selector */}
      <div className="flex gap-2 flex-wrap">
        {(Object.entries(PLATFORMS) as [keyof typeof PLATFORMS, typeof PLATFORMS[keyof typeof PLATFORMS]][]).map(([k, v]) => (
          <button key={k} onClick={() => setPlatform(k)}
            className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
            style={platform === k ? { background: '#4154A3', color: '#fff' } : { background: '#F0F2F7', color: '#5F6E93' }}>
            {v.label} ({v.w}x{v.h})
          </button>
        ))}
      </div>

      {/* Preview */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #D5DAE5', boxShadow: editState.shadowEnabled ? `0 4px ${editState.shadowBlur}px rgba(0,0,0,0.1)` : undefined }}>
        <div style={{ position: 'relative', width: '100%', paddingBottom: `${(size.h / size.w) * 100}%` }}>
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <div style={{ transform: `scale(${1 / (size.w / 580)})`, transformOrigin: 'top left', width: size.w, height: size.h }}>
              <div ref={ref} style={{
                width: size.w, height: size.h, ...bgStyle,
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                alignItems: editState.textAlign === 'left' ? 'flex-start' : editState.textAlign === 'right' ? 'flex-end' : 'center',
                padding: `${editState.paddingY}px ${editState.paddingX}px`,
                fontFamily: 'system-ui, -apple-system, sans-serif',
                position: 'relative', overflow: 'hidden',
                borderRadius: editState.cornerRadius,
              }}>
                {/* BG image */}
                {editState.customImage && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${editState.customImage})`,
                    backgroundSize: editState.imagePosition === 'cover' ? 'cover' : '50%',
                    backgroundPosition: editState.imagePosition === 'right' ? 'right center' : editState.imagePosition === 'left' ? 'left center' : 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: editState.imageOpacity / 100,
                  }} />
                )}
                {editState.overlayOpacity > 0 && (
                  <div style={{ position: 'absolute', inset: 0, background: `rgba(0,0,0,${editState.overlayOpacity / 100})` }} />
                )}
                <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

                {editState.logoVisible && (
                  <div style={{ marginBottom: 32, transform: `scale(${logoScale})`, transformOrigin: editState.textAlign === 'left' ? 'left center' : editState.textAlign === 'right' ? 'right center' : 'center', zIndex: 1 }}>
                    {dark ? <WhiteLogo size={40} /> : <ColorLogo size={40} />}
                  </div>
                )}
                <p style={{ fontSize: (size.w > 1100 ? 52 : 44) * baseFontScale, fontWeight: 700, color: editState.bgType !== 'preset' ? editState.textColor : '#fff', textAlign: editState.textAlign, lineHeight: 1.2, position: 'relative', zIndex: 1 }}>{headline}</p>
                <p style={{ fontSize: (size.w > 1100 ? 20 : 18) * subFontScale, color: editState.bgType !== 'preset' ? editState.subTextColor : 'rgba(255,255,255,0.75)', textAlign: editState.textAlign, marginTop: 16, lineHeight: 1.5, position: 'relative', zIndex: 1 }}>{subline}</p>
                <p style={{ position: 'absolute', bottom: 30, left: 0, right: 0, textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, zIndex: 1 }}>integratewise.ai</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Edit */}
      <button onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg transition-colors"
        style={{ background: showAdvanced ? 'rgba(65,84,163,0.1)' : '#F0F2F7', color: showAdvanced ? '#4154A3' : '#5F6E93' }}>
        <Settings className="w-3.5 h-3.5" /> Advanced Edit
        {showAdvanced ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>
      {showAdvanced && <AdvancedEditPanel state={editState} onChange={setEditState} />}

      {/* Actions */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={exportSingle} disabled={isExporting}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white transition-all"
          style={{ background: isExporting ? '#9BA8C2' : '#4154A3' }}>
          <Download className="w-3.5 h-3.5" /> {isExporting ? 'Exporting...' : `Download ${size.label}`}
        </button>
        <button onClick={batchExport} disabled={isBatch}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all"
          style={{ background: isBatch ? '#9BA8C2' : '#F0F2F7', color: isBatch ? '#fff' : '#4154A3' }}>
          <Layers className="w-3.5 h-3.5" /> {isBatch ? 'Zipping...' : 'Batch All 4 Platforms (.zip)'}
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   4. TEAM & SIGNATURES
   ═══════════════════════════════════════ */
function TeamRosterManager({ team, setTeam }: { team: TeamMember[]; setTeam: React.Dispatch<React.SetStateAction<TeamMember[]>> }) {
  const { copiedId, copy } = useCopy();
  const [editingId, setEditingId] = useState<string | null>(null);

  const addMember = () => setTeam(prev => [...prev, { id: crypto.randomUUID(), name: 'New Member', title: 'Role', email: 'connect' }]);
  const updateMember = (id: string, field: keyof TeamMember, value: string) => setTeam(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
  const removeMember = (id: string) => setTeam(prev => prev.filter(m => m.id !== id));

  const copyAllSignatures = () => {
    const all = team.map(m => buildSignaturePlain(m.name, m.title, BRAND.emails[m.email] || m.email)).join('\n\n---\n\n');
    copy('all-sigs', all);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SectionLabel>TEAM MEMBERS ({team.length})</SectionLabel>
        <div className="flex gap-2">
          <CopyBtn id="all-sigs" text="" copiedId={copiedId} copy={() => copyAllSignatures()} label={copiedId === 'all-sigs' ? 'Copied All!' : 'Copy All Sigs'} />
          <button onClick={addMember} className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium" style={{ background: '#F0F2F7', color: '#4154A3' }}>
            <Plus className="w-3 h-3" /> Add
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {team.map(member => {
          const emailAddr = BRAND.emails[member.email] || member.email;
          const isEditing = editingId === member.id;
          return (
            <div key={member.id} className="rounded-lg overflow-hidden" style={{ border: '1px solid #E8ECF2' }}>
              <div className="flex items-center gap-3 px-4 py-3" style={{ background: isEditing ? '#F0F2F7' : '#fff' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0" style={{ background: '#4154A3' }}>
                  {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                {isEditing ? (
                  <div className="flex-1 grid sm:grid-cols-3 gap-2">
                    <input value={member.name} onChange={e => updateMember(member.id, 'name', e.target.value)}
                      className="px-2 py-1 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#4154A3]/30" style={{ border: '1px solid #D5DAE5', color: '#1B2544' }} placeholder="Name" />
                    <input value={member.title} onChange={e => updateMember(member.id, 'title', e.target.value)}
                      className="px-2 py-1 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#4154A3]/30" style={{ border: '1px solid #D5DAE5', color: '#1B2544' }} placeholder="Title" />
                    <select value={member.email} onChange={e => updateMember(member.id, 'email', e.target.value)}
                      className="px-2 py-1 rounded text-xs bg-white focus:outline-none" style={{ border: '1px solid #D5DAE5', color: '#1B2544' }}>
                      {Object.keys(BRAND.emails).map(k => <option key={k} value={k}>{k}@integratewise.co</option>)}
                    </select>
                  </div>
                ) : (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: '#1B2544' }}>{member.name}</p>
                    <p className="text-[11px]" style={{ color: '#7B8AAD' }}>{member.title} · {emailAddr}</p>
                  </div>
                )}
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => setEditingId(isEditing ? null : member.id)} className="p-1.5 rounded hover:bg-[#F0F2F7]">
                    <Pencil className="w-3.5 h-3.5" style={{ color: isEditing ? '#4154A3' : '#9BA8C2' }} />
                  </button>
                  <CopyBtn id={`sig-${member.id}`} text={buildSignatureHtml(member.name, member.title, emailAddr)} copiedId={copiedId} copy={copy} label="HTML" />
                  {team.length > 1 && (
                    <button onClick={() => removeMember(member.id)} className="p-1.5 rounded hover:bg-red-50">
                      <Trash2 className="w-3.5 h-3.5" style={{ color: '#EF4444' }} />
                    </button>
                  )}
                </div>
              </div>
              {isEditing && (
                <div className="px-4 pb-3">
                  <div className="rounded-lg bg-white p-4 mt-2" style={{ border: '1px solid #D5DAE5' }}>
                    <div dangerouslySetInnerHTML={{ __html: buildSignatureHtml(member.name, member.title, emailAddr) }} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   5. COPY LIBRARY
   ═══════════════════════════════════════ */
function CopyLibrary() {
  const { copiedId, copy } = useCopy();
  const groups = [
    { name: 'TAGLINES', items: [
      { id: 'tag1', label: 'Primary', text: BRAND.tagline },
      { id: 'tag2', label: 'Short', text: BRAND.taglineShort },
      { id: 'tag3', label: 'Extended', text: BRAND.taglineExtended },
    ]},
    { name: 'DESCRIPTORS', items: [
      { id: 'desc1', label: 'Full', text: BRAND.descriptor },
      { id: 'desc2', label: 'Short', text: BRAND.descriptorShort },
    ]},
    { name: 'SPINE', items: BRAND.spineDescriptions.map((s, i) => ({ id: `spine${i}`, label: ['Short', 'Medium', 'Full'][i], text: s })) },
    { name: 'ASSET-SPECIFIC', items: [
      { id: 'a1', label: 'Letterhead', text: `${BRAND.company} · ${BRAND.descriptor}` },
      { id: 'a2', label: 'Invoice Footer', text: 'IntegrateWise — AI Thinks in Context and Works Through Approvals' },
      { id: 'a3', label: 'Business Card', text: BRAND.descriptor },
      { id: 'a4', label: 'Profile Headline', text: 'The Knowledge Workspace Where AI Thinks in Context' },
      { id: 'a5', label: 'Brochure', text: 'Bring Work, Knowledge, and Decisions Together Through the Spine' },
      { id: 'a6', label: 'Marketing', text: 'Work Becomes Smarter When AI Understands Context' },
    ]},
    { name: 'CONTACT BLOCKS', items: [
      { id: 'cb1', label: 'Corporate', text: `${BRAND.company}\n${BRAND.descriptor}\n\n${BRAND.tagline}\n\n${BRAND.location}\n${BRAND.website}\n\n${BRAND.emails.general}\n${BRAND.emails.connect}\n${BRAND.emails.support}` },
      { id: 'cb2', label: 'Footer', text: `${BRAND.company} · ${BRAND.descriptor}\n${BRAND.tagline}\n${BRAND.location} · ${BRAND.website}` },
      { id: 'cb3', label: 'LinkedIn About', text: BRAND.linkedinAbout },
      { id: 'cb4', label: 'LinkedIn Specialties', text: BRAND.linkedinSpecialties },
    ]},
    { name: 'EMAILS', items: Object.entries(BRAND.emails).map(([k, v]) => ({ id: `em-${k}`, label: k.charAt(0).toUpperCase() + k.slice(1), text: v })) },
  ];

  const copyAll = () => {
    const all = groups.flatMap(g => g.items.map(i => `[${g.name} — ${i.label}]\n${i.text}`)).join('\n\n---\n\n');
    copy('all-copy', all);
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <CopyBtn id="all-copy" text="" copiedId={copiedId} copy={() => copyAll()} label={copiedId === 'all-copy' ? 'Copied All!' : 'Copy Entire Library'} />
      </div>
      {groups.map(g => (
        <div key={g.name}>
          <SectionLabel>{g.name}</SectionLabel>
          <div className="space-y-1.5">
            {g.items.map(item => (
              <div key={item.id} className="flex items-center gap-3 px-3 py-2 rounded-lg" style={{ background: '#F0F2F7' }}>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium" style={{ color: '#7B8AAD' }}>{item.label}</p>
                  <p className="text-sm mt-0.5 truncate" style={{ color: '#2F3D5E' }}>{item.text}</p>
                </div>
                <CopyBtn id={item.id} text={item.text} copiedId={copiedId} copy={copy} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════
   SIGNATURE BUILDERS
   ═══════════════════════════════════════ */
function buildSignatureHtml(name: string, title: string, email: string) {
  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#2F3D5E;">
  <tr>
    <td style="padding-right:16px;vertical-align:top;">
      <img src="https://branding.integratewise.ai/logo-icon.png" width="48" height="48" alt="IntegrateWise" style="display:block;" />
    </td>
    <td style="vertical-align:top;">
      <p style="margin:0;font-size:15px;font-weight:600;color:#1B2544;">${name}</p>
      <p style="margin:2px 0 0;font-size:12px;color:#5F6E93;">${title}</p>
      <p style="margin:8px 0 0;font-size:13px;font-weight:500;color:#2F3D5E;">${BRAND.company}</p>
      <p style="margin:2px 0 0;font-size:11px;color:#7B8AAD;">${BRAND.descriptor}</p>
      <table cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;">
        <tr>
          <td style="font-size:11px;color:#5F6E93;padding-right:12px;"><a href="mailto:${email}" style="color:#4154A3;text-decoration:none;">${email}</a></td>
          <td style="font-size:11px;color:#5F6E93;padding-right:12px;"><a href="https://${BRAND.website}" style="color:#4154A3;text-decoration:none;">${BRAND.website}</a></td>
          <td style="font-size:11px;color:#7B8AAD;">${BRAND.location}</td>
        </tr>
      </table>
      <p style="margin:8px 0 0;padding-top:8px;border-top:1px solid #4154A3;font-size:11px;color:#9BA8C2;font-style:italic;">${BRAND.tagline}</p>
    </td>
  </tr>
</table>`;
}

function buildSignaturePlain(name: string, title: string, email: string) {
  return `${name}\n${title}\n\n${BRAND.company}\n${BRAND.descriptor}\n\n${BRAND.tagline}\n\n${email}\n${BRAND.website}\n${BRAND.location}`;
}

/* ═══════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════ */
type Tool = 'campaign-kit' | 'linkedin-banner' | 'social-post' | 'team-roster' | 'copy-library';

const tools: { id: Tool; icon: typeof Package; label: string; desc: string; color: string; badge?: string }[] = [
  { id: 'campaign-kit', icon: Package, label: 'Campaign Kit', desc: 'One-click full export', color: '#EB4379', badge: 'NEW' },
  { id: 'linkedin-banner', icon: Linkedin, label: 'LinkedIn Banners', desc: '1584x396, 4 styles', color: '#0A66C2' },
  { id: 'social-post', icon: ImageIcon, label: 'Social Posts', desc: 'Editable, all platforms', color: '#4154A3' },
  { id: 'team-roster', icon: Users, label: 'Team & Signatures', desc: 'Manage team, copy HTML', color: '#364789' },
  { id: 'copy-library', icon: Type, label: 'Copy Library', desc: 'All approved copy', color: '#6B7DC4' },
];

export function GeneratorsPage() {
  const [activeTool, setActiveTool] = useState<Tool>('campaign-kit');
  const [team, setTeam] = useState<TeamMember[]>(DEFAULT_TEAM);
  const [exportLog, setExportLog] = useState<ExportLogEntry[]>([]);
  const [showLog, setShowLog] = useState(false);

  const activeToolData = tools.find(t => t.id === activeTool)!;
  const ActiveIcon = activeToolData.icon;

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: '#1B2544' }}>Quick Generators</h2>
          <p className="mt-1" style={{ color: '#7B8AAD' }}>Reusable, automatable brand asset generation. One click, zero design work.</p>
        </div>
        {exportLog.length > 0 && (
          <button onClick={() => setShowLog(!showLog)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium self-start"
            style={{ background: '#F0F2F7', color: '#5F6E93' }}>
            <Clock className="w-3.5 h-3.5" /> Export Log ({exportLog.length})
            {showLog ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        )}
      </div>

      {/* Export Log */}
      {showLog && exportLog.length > 0 && (
        <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #D5DAE5' }}>
          <div className="px-4 py-3" style={{ borderBottom: '1px solid #E8ECF2' }}>
            <p className="text-xs font-semibold" style={{ color: '#475578' }}>Recent Exports</p>
          </div>
          <div className="divide-y" style={{ borderColor: '#E8ECF2' }}>
            {exportLog.map(e => (
              <div key={e.id} className="flex items-center gap-3 px-4 py-2.5">
                <CircleCheck className="w-3.5 h-3.5 shrink-0" style={{ color: '#10B981' }} />
                <p className="text-xs flex-1" style={{ color: '#2F3D5E' }}>{e.name}</p>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: '#F0F2F7', color: '#7B8AAD' }}>{e.type}</span>
                <span className="text-[10px]" style={{ color: '#BCC3D4' }}>
                  {new Date(e.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tool Grid + Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 shrink-0 space-y-2">
          {tools.map(tool => (
            <button key={tool.id} onClick={() => setActiveTool(tool.id)}
              className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
              style={activeTool === tool.id
                ? { background: '#4154A3', color: '#fff' }
                : { background: '#fff', border: '1px solid #D5DAE5', color: '#5F6E93' }
              }>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: activeTool === tool.id ? 'rgba(255,255,255,0.15)' : `${tool.color}12` }}>
                <tool.icon className="w-4 h-4" style={{ color: activeTool === tool.id ? '#fff' : tool.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-medium truncate">{tool.label}</p>
                  {tool.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: activeTool === tool.id ? 'rgba(255,255,255,0.25)' : '#EB4379', color: '#fff' }}>
                      {tool.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] opacity-70 truncate">{tool.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-xl p-6 lg:p-8" style={{ border: '1px solid #D5DAE5' }}>
            <div className="flex items-center gap-3 mb-6 pb-5" style={{ borderBottom: '1px solid #E8ECF2' }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${activeToolData.color}12` }}>
                <ActiveIcon className="w-5 h-5" style={{ color: activeToolData.color }} />
              </div>
              <div>
                <h3 className="text-base font-semibold" style={{ color: '#1B2544' }}>{activeToolData.label}</h3>
                <p className="text-xs" style={{ color: '#7B8AAD' }}>{activeToolData.desc}</p>
              </div>
            </div>

            {activeTool === 'campaign-kit' && <CampaignKitGenerator team={team} setExportLog={setExportLog} />}
            {activeTool === 'linkedin-banner' && <LinkedInBannerGenerator setExportLog={setExportLog} />}
            {activeTool === 'social-post' && <SocialPostGenerator setExportLog={setExportLog} />}
            {activeTool === 'team-roster' && <TeamRosterManager team={team} setTeam={setTeam} />}
            {activeTool === 'copy-library' && <CopyLibrary />}
          </div>
        </div>
      </div>
    </div>
  );
}
