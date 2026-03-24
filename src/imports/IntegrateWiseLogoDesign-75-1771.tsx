import clsx from "clsx";
import svgPaths from "./svg-tcpmwsofpl";
type ContainerBackgroundImage3Props = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage3({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImage3Props>) {
  return (
    <div className={clsx("relative rounded-[10px] shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10px] relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage6Props = {
  additionalClassNames?: string;
};

function BackgroundImage6({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage6Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage5Props = {
  additionalClassNames?: string;
};

function BackgroundImage5({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage5Props>) {
  return <BackgroundImage6 additionalClassNames={clsx("relative shrink-0", additionalClassNames)}>{children}</BackgroundImage6>;
}
type ContainerBackgroundImage2Props = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImage2Props>) {
  return <BackgroundImage6 additionalClassNames={clsx("min-h-px min-w-px relative", additionalClassNames)}>{children}</BackgroundImage6>;
}
type BackgroundImage4Props = {
  additionalClassNames?: string;
};

function BackgroundImage4({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage4Props>) {
  return (
    <div className={clsx("h-[28px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}

function BackgroundImage3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[28px] relative rounded-[4px] shrink-0 w-[26px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[7px] px-[6px] relative size-full">{children}</div>
    </div>
  );
}

function BackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[28px] relative shrink-0 w-[136.328px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-start relative size-full">{children}</div>
    </div>
  );
}

function BackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}

function ContainerBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[62.5px] relative rounded-[10px] shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">{children}</div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e8ecf2] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}
type TextInputBackgroundImageProps = {
  additionalClassNames?: string;
};

function TextInputBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<TextInputBackgroundImageProps>) {
  return (
    <div className={clsx("absolute h-[27px] rounded-[4px] top-0 w-[198.219px]", additionalClassNames)}>
      <div className="content-stretch flex items-center overflow-clip px-[8px] py-[4px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(27,37,68,0.5)] whitespace-nowrap">{children}</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d5dae5] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}
type BackgroundImageProps = {
  additionalClassNames?: string;
};

function BackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImageProps>) {
  return (
    <div className={clsx("h-[60.5px] relative shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] relative size-full">{children}</div>
      </div>
    </div>
  );
}

function ButtonBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-white h-[62.5px] relative rounded-[14px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#d5dae5] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[17px] py-px relative size-full">{children}</div>
      </div>
    </div>
  );
}

function IconBackgroundImage3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type IconBackgroundImage2Props = {
  additionalClassNames?: string;
};

function IconBackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<IconBackgroundImage2Props>) {
  return (
    <div className={clsx("absolute size-[12px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type LinkBackgroundImageProps = {
  additionalClassNames?: string;
};

function LinkBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<LinkBackgroundImageProps>) {
  return (
    <div className={clsx("h-[40px] relative rounded-[10px] shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[16px] relative size-full">{children}</div>
      </div>
    </div>
  );
}

function IconBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage1>
      <g id="Icon">{children}</g>
    </BackgroundImage1>
  );
}

function VectorBackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute inset-[12.5%_16.67%_16.67%_12.5%]">
      <div className="absolute inset-[-5.88%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0826 11.0826">
          {children}
        </svg>
      </div>
    </div>
  );
}

function VectorBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute bottom-[16.67%] left-1/2 right-[12.5%] top-[83.33%]">
      <div className="absolute inset-[-0.58px_-11.11%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.41667 1.16667">
          {children}
        </svg>
      </div>
    </div>
  );
}

function ContainerBackgroundImage() {
  return (
    <BackgroundImage2>
      <BackgroundImage3>
        <div className="h-[14px] overflow-clip relative shrink-0 w-full">
          <VectorBackgroundImage1>
            <path d="M0.583333 0.583333H5.83333" id="Vector" stroke="var(--stroke-0, #9BA8C2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </VectorBackgroundImage1>
          <VectorBackgroundImage2>
            <path d={svgPaths.p9a58400} id="Vector" stroke="var(--stroke-0, #9BA8C2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </VectorBackgroundImage2>
        </div>
      </BackgroundImage3>
      <CopyBtnBackgroundImageAndText text="HTML" />
      <ButtonBackgroundImage />
    </BackgroundImage2>
  );
}
type ParagraphBackgroundImageAndText3Props = {
  text: string;
};

function ParagraphBackgroundImageAndText3({ text }: ParagraphBackgroundImageAndText3Props) {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#1b2544] text-[14px] top-0 tracking-[-0.1504px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type TableCellBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TableCellBackgroundImageAndText({ text, additionalClassNames = "" }: TableCellBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute h-[16.5px] top-0", additionalClassNames)}>
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16.5px] left-0 not-italic text-[#4154a3] text-[11px] top-0 whitespace-nowrap">{text}</p>
    </div>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText({ text, additionalClassNames = "" }: BackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute h-[16.5px]", additionalClassNames)}>
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16.5px] left-0 not-italic text-[#7b8aad] text-[11px] top-0 whitespace-nowrap">{text}</p>
    </div>
  );
}

function ButtonBackgroundImage() {
  return (
    <BackgroundImage3>
      <div className="h-[14px] overflow-clip relative shrink-0 w-full">
        <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-0.58px_-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 1.16667">
              <path d="M0.583333 0.583333H11.0833" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-6.25%_-7.14%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 10.5">
              <path d={svgPaths.p21838680} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-25%_-12.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.83333 3.5">
              <path d={svgPaths.p2c2c0a80} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
          </div>
        </div>
        <VectorBackgroundImage additionalClassNames="inset-[45.83%_58.33%_29.17%_41.67%]" />
        <VectorBackgroundImage additionalClassNames="inset-[45.83%_41.67%_29.17%_58.33%]" />
      </div>
    </BackgroundImage3>
  );
}
type VectorBackgroundImageProps = {
  additionalClassNames?: string;
};

function VectorBackgroundImage({ additionalClassNames = "" }: VectorBackgroundImageProps) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute inset-[-16.67%_-0.58px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.16667 4.66667">
          <path d="M0.583333 0.583333V4.08333" id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </svg>
      </div>
    </div>
  );
}
type CopyBtnBackgroundImageAndTextProps = {
  text: string;
};

function CopyBtnBackgroundImageAndText({ text }: CopyBtnBackgroundImageAndTextProps) {
  return (
    <div className="bg-[rgba(65,84,163,0.08)] flex-[1_0_0] h-[28px] min-h-px min-w-px relative rounded-[8px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <IconBackgroundImage />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[47.5px] not-italic text-[#4154a3] text-[12px] text-center top-[6px] whitespace-nowrap">{text}</p>
      </div>
    </div>
  );
}
type ContainerBackgroundImageAndTextProps = {
  text: string;
};

function ContainerBackgroundImageAndText({ text }: ContainerBackgroundImageAndTextProps) {
  return (
    <div className="bg-[#4154a3] relative rounded-[33554400px] shrink-0 size-[32px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">{text}</p>
      </div>
    </div>
  );
}

function IconBackgroundImage() {
  return (
    <div className="absolute left-[12px] size-[12px] top-[8px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_75_1789)" id="Icon">
          <path d={svgPaths.p23fe4800} id="Vector" stroke="var(--stroke-0, #4154A3)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p99a3180} id="Vector_2" stroke="var(--stroke-0, #4154A3)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_75_1789">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
type ParagraphBackgroundImageAndText2Props = {
  text: string;
};

function ParagraphBackgroundImageAndText2({ text }: ParagraphBackgroundImageAndText2Props) {
  return (
    <div className="h-[16.5px] opacity-70 overflow-clip relative shrink-0 w-full">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#5f6e93] text-[11px] top-0 tracking-[0.0645px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type ParagraphBackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function ParagraphBackgroundImageAndText1({ text, additionalClassNames = "" }: ParagraphBackgroundImageAndText1Props) {
  return (
    <div className={clsx("h-[20px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#5f6e93] text-[14px] top-0 tracking-[-0.1504px] whitespace-nowrap">{text}</p>
      </div>
    </div>
  );
}
type NavLinkBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function NavLinkBackgroundImageAndText({ text, additionalClassNames = "" }: NavLinkBackgroundImageAndTextProps) {
  return (
    <div className={clsx("h-[20px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#5f6e93] text-[14px] top-0 tracking-[-0.1504px] whitespace-nowrap">{text}</p>
      </div>
    </div>
  );
}
type ParagraphBackgroundImageAndTextProps = {
  text: string;
};

function ParagraphBackgroundImageAndText({ text }: ParagraphBackgroundImageAndTextProps) {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#7b8aad] text-[11px] top-0 tracking-[0.0645px] whitespace-nowrap">{text}</p>
    </div>
  );
}

export default function IntegrateWiseLogoDesign() {
  return (
    <div className="bg-[#edf0f5] content-stretch flex items-start relative size-full" data-name="IntegrateWise Logo Design">
      <div className="bg-white h-[895px] relative shrink-0 w-[288px]" data-name="Sidebar">
        <div aria-hidden="true" className="absolute border-[#d5dae5] border-r border-solid inset-0 pointer-events-none" />
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-px relative size-full">
          <div className="h-[64px] relative shrink-0 w-[287px]" data-name="Container">
            <div aria-hidden="true" className="absolute border-[#e8ecf2] border-b border-solid inset-0 pointer-events-none" />
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[33.262px] items-center pb-px pl-[24px] relative size-full">
              <div className="h-[36px] relative shrink-0 w-[75.75px]" data-name="IntegrateWiseLogo">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
                  <div className="flex-[1_0_0] h-[36px] min-h-px min-w-px relative" data-name="Icon">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                      <div className="absolute inset-[0_6.71%_1.61%_0]" data-name="Vector">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 70.668 35.4211">
                          <path d={svgPaths.p3fd56840} fill="var(--fill-0, #4154A3)" id="Vector" />
                        </svg>
                      </div>
                      <div className="absolute inset-[31.67%_57.15%_1.16%_26.56%]" data-name="Vector">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.3397 24.1817">
                          <path d={svgPaths.p1408e440} fill="var(--fill-0, #4154A3)" id="Vector" />
                        </svg>
                      </div>
                      <div className="absolute inset-[0.05%_28.9%_33.02%_54.89%]" data-name="Vector">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.2833 24.094">
                          <path d={svgPaths.p345fdb80} fill="var(--fill-0, #4154A3)" id="Vector" />
                        </svg>
                      </div>
                      <div className="absolute inset-[31.44%_0.4%_32.71%_83.1%]" data-name="Vector">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5018 12.9067">
                          <path d={svgPaths.pfafeb00} fill="var(--fill-0, #EB4379)" id="Vector" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <BackgroundImage5 additionalClassNames="h-[36.5px] w-[94.031px]">
                <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
                  <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#1b2544] text-[14px] top-0 tracking-[-0.1504px] whitespace-nowrap">IntegrateWise</p>
                </div>
                <ParagraphBackgroundImageAndText text="Brand Store" />
              </BackgroundImage5>
            </div>
          </div>
          <div className="flex-[739.5_0_0] min-h-px min-w-px relative w-[287px]" data-name="Navigation">
            <div className="overflow-clip rounded-[inherit] size-full">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start pt-[16px] px-[16px] relative size-full">
                <LinkBackgroundImage>
                  <IconBackgroundImage1>
                    <path d={svgPaths.p275d2400} id="Vector" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d={svgPaths.p21a7e80} id="Vector_2" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </IconBackgroundImage1>
                  <NavLinkBackgroundImageAndText text="Overview" additionalClassNames="w-[60.203px]" />
                </LinkBackgroundImage>
                <LinkBackgroundImage additionalClassNames="bg-[#4154a3]">
                  <IconBackgroundImage1>
                    <path d={svgPaths.p3a2fa580} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </IconBackgroundImage1>
                  <div className="h-[20px] relative shrink-0 w-[112.859px]" data-name="NavLink">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-white top-0 tracking-[-0.1504px] whitespace-nowrap">Quick Generators</p>
                    </div>
                  </div>
                </LinkBackgroundImage>
                <LinkBackgroundImage>
                  <BackgroundImage1>
                    <g clipPath="url(#clip0_29_947)" id="Icon">
                      <path d={svgPaths.p14899500} fill="var(--fill-0, #7B8AAD)" id="Vector" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.pa15a670} fill="var(--fill-0, #7B8AAD)" id="Vector_2" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p3ad59a00} fill="var(--fill-0, #7B8AAD)" id="Vector_3" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p295c7f00} fill="var(--fill-0, #7B8AAD)" id="Vector_4" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p14b85b70} id="Vector_5" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </g>
                    <defs>
                      <clipPath id="clip0_29_947">
                        <rect fill="white" height="20" width="20" />
                      </clipPath>
                    </defs>
                  </BackgroundImage1>
                  <NavLinkBackgroundImageAndText text="Brand Assets" additionalClassNames="w-[85.266px]" />
                </LinkBackgroundImage>
                <LinkBackgroundImage>
                  <IconBackgroundImage1>
                    <path d={svgPaths.p37a07900} id="Vector" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d={svgPaths.p328d7880} id="Vector_2" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d="M5.83333 14.1667H5.84167" id="Vector_3" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d={svgPaths.p30b5e000} id="Vector_4" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </IconBackgroundImage1>
                  <NavLinkBackgroundImageAndText text="Design Tokens" additionalClassNames="w-[94.172px]" />
                </LinkBackgroundImage>
                <LinkBackgroundImage>
                  <IconBackgroundImage1>
                    <path d="M4.16667 18.3333H15.8333" id="Vector" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d={svgPaths.p2a47df00} id="Vector_2" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d={svgPaths.p36e14b60} id="Vector_3" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </IconBackgroundImage1>
                  <NavLinkBackgroundImageAndText text="Stationery" additionalClassNames="w-[66.219px]" />
                </LinkBackgroundImage>
                <LinkBackgroundImage>
                  <IconBackgroundImage1>
                    <path d={svgPaths.p3df93000} id="Vector" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d={svgPaths.p176f31c0} id="Vector_2" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </IconBackgroundImage1>
                  <NavLinkBackgroundImageAndText text="Marketing" additionalClassNames="w-[64.453px]" />
                </LinkBackgroundImage>
                <LinkBackgroundImage>
                  <BackgroundImage1>
                    <g clipPath="url(#clip0_29_940)" id="Icon">
                      <path d={svgPaths.p3a9a4340} id="Vector" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p9bc2a00} id="Vector_2" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p2364160} id="Vector_3" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p32312e00} id="Vector_4" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.pa6c9d80} id="Vector_5" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </g>
                    <defs>
                      <clipPath id="clip0_29_940">
                        <rect fill="white" height="20" width="20" />
                      </clipPath>
                    </defs>
                  </BackgroundImage1>
                  <NavLinkBackgroundImageAndText text="Sales" additionalClassNames="w-[34.766px]" />
                </LinkBackgroundImage>
              </div>
            </div>
          </div>
          <div className="h-[91.5px] relative shrink-0 w-[287px]" data-name="Container">
            <div aria-hidden="true" className="absolute border-[#e8ecf2] border-solid border-t inset-0 pointer-events-none" />
            <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[17px] px-[16px] relative size-full">
              <div className="h-[58.5px] relative rounded-[10px] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(167.079deg, rgba(65, 84, 163, 0.08) 0%, rgba(235, 67, 121, 0.08) 100%)" }}>
                <div className="content-stretch flex flex-col gap-[2px] items-start pt-[12px] px-[16px] relative size-full">
                  <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
                    <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#2f3d5e] text-[12px]">Brand Store v1.0</p>
                  </div>
                  <ParagraphBackgroundImageAndText text="Brand + Marketing + Sales" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContainerBackgroundImage2 additionalClassNames="flex-[1263_0_0] h-[895px]">
        <div className="bg-white h-[64px] relative shrink-0 w-[1263px]" data-name="Header">
          <div aria-hidden="true" className="absolute border-[#d5dae5] border-b border-solid inset-0 pointer-events-none" />
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-px pl-[24px] relative size-full">
            <BackgroundImage4 additionalClassNames="w-[146.922px]">
              <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#1b2544] text-[18px] top-0 tracking-[-0.4395px] whitespace-nowrap">Quick Generators</p>
            </BackgroundImage4>
          </div>
        </div>
        <div className="flex-[831_0_0] min-h-px min-w-px relative w-[1263px]" data-name="Main Content">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
            <div className="h-[766.5px] relative shrink-0 w-full" data-name="GeneratorsPage">
              <div className="content-stretch flex flex-col gap-[32px] items-start pt-[40px] px-[40px] relative size-full">
                <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
                  <div className="absolute content-stretch flex flex-col gap-[4px] h-[60px] items-start left-0 top-0 w-[549.094px]" data-name="Container">
                    <div className="h-[32px] relative shrink-0 w-full" data-name="Heading 2">
                      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#1b2544] text-[24px] top-0 tracking-[0.0703px] whitespace-nowrap">Quick Generators</p>
                    </div>
                    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
                      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#7b8aad] text-[16px] top-0 tracking-[-0.3125px] whitespace-nowrap">Reusable, automatable brand asset generation. One click, zero design work.</p>
                    </div>
                  </div>
                  <div className="absolute bg-[#f0f2f7] h-[32px] left-[1035.91px] rounded-[10px] top-0 w-[147.094px]" data-name="Button">
                    <div className="absolute left-[12px] size-[14px] top-[9px]" data-name="Icon">
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                        <g clipPath="url(#clip0_75_550)" id="Icon">
                          <path d={svgPaths.pc012c00} id="Vector" stroke="var(--stroke-0, #5F6E93)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                          <path d="M7 3.5V7L9.33333 8.16667" id="Vector_2" stroke="var(--stroke-0, #5F6E93)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                        </g>
                        <defs>
                          <clipPath id="clip0_75_550">
                            <rect fill="white" height="14" width="14" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[75.5px] not-italic text-[#5f6e93] text-[12px] text-center top-[8px] whitespace-nowrap">Export Log (1)</p>
                    <IconBackgroundImage2 additionalClassNames="left-[123.09px] top-[10px]">
                      <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #5F6E93)" strokeLinecap="round" strokeLinejoin="round" />
                    </IconBackgroundImage2>
                  </div>
                </div>
                <div className="content-stretch flex gap-[24px] h-[594.5px] items-start relative shrink-0 w-full" data-name="Container">
                  <div className="h-[594.5px] relative shrink-0 w-[256px]" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
                      <ButtonBackgroundImage1>
                        <ContainerBackgroundImage3 additionalClassNames="bg-[rgba(235,67,121,0.07)] size-[36px]">
                          <IconBackgroundImage3>
                            <path d={svgPaths.p18993c00} id="Vector" stroke="var(--stroke-0, #EB4379)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d="M8 14.6667V8" id="Vector_2" stroke="var(--stroke-0, #EB4379)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d={svgPaths.p14df0fc0} id="Vector_3" stroke="var(--stroke-0, #EB4379)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d="M5 2.84667L11 6.28" id="Vector_4" stroke="var(--stroke-0, #EB4379)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          </IconBackgroundImage3>
                        </ContainerBackgroundImage3>
                        <ContainerBackgroundImage2 additionalClassNames="flex-[174_0_0] h-[36.5px]">
                          <div className="content-stretch flex gap-[6px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
                            <ParagraphBackgroundImageAndText1 text="Campaign Kit" additionalClassNames="w-[88.297px]" />
                            <div className="bg-[#eb4379] h-[17.5px] relative rounded-[33554400px] shrink-0 w-[34.109px]" data-name="Text">
                              <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                                <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[13.5px] left-[6px] not-italic text-[9px] text-white top-[2px] tracking-[0.167px] whitespace-nowrap">NEW</p>
                              </div>
                            </div>
                          </div>
                          <ParagraphBackgroundImageAndText2 text="One-click full export" />
                        </ContainerBackgroundImage2>
                      </ButtonBackgroundImage1>
                      <ButtonBackgroundImage1>
                        <ContainerBackgroundImage3 additionalClassNames="bg-[rgba(10,102,194,0.07)] size-[36px]">
                          <IconBackgroundImage3>
                            <path d={svgPaths.p14dc0c00} id="Vector" stroke="var(--stroke-0, #0A66C2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d="M4 6H1.33333V14H4V6Z" id="Vector_2" stroke="var(--stroke-0, #0A66C2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d={svgPaths.p342eb800} id="Vector_3" stroke="var(--stroke-0, #0A66C2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          </IconBackgroundImage3>
                        </ContainerBackgroundImage3>
                        <ContainerBackgroundImage2 additionalClassNames="flex-[174_0_0] h-[36.5px]">
                          <div className="content-stretch flex h-[20px] items-center relative shrink-0 w-full" data-name="Container">
                            <ParagraphBackgroundImageAndText1 text="LinkedIn Banners" additionalClassNames="w-[113.406px]" />
                          </div>
                          <ParagraphBackgroundImageAndText2 text="1584x396, 4 styles" />
                        </ContainerBackgroundImage2>
                      </ButtonBackgroundImage1>
                      <ButtonBackgroundImage1>
                        <ContainerBackgroundImage3 additionalClassNames="bg-[rgba(65,84,163,0.07)] size-[36px]">
                          <IconBackgroundImage3>
                            <path d={svgPaths.p19d57600} id="Vector" stroke="var(--stroke-0, #4154A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d={svgPaths.p2fe1fe40} id="Vector_2" stroke="var(--stroke-0, #4154A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d={svgPaths.p2c494540} id="Vector_3" stroke="var(--stroke-0, #4154A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          </IconBackgroundImage3>
                        </ContainerBackgroundImage3>
                        <ContainerBackgroundImage2 additionalClassNames="flex-[174_0_0] h-[36.5px]">
                          <div className="content-stretch flex h-[20px] items-center relative shrink-0 w-full" data-name="Container">
                            <ParagraphBackgroundImageAndText1 text="Social Posts" additionalClassNames="w-[80.266px]" />
                          </div>
                          <ParagraphBackgroundImageAndText2 text="Editable, all platforms" />
                        </ContainerBackgroundImage2>
                      </ButtonBackgroundImage1>
                      <BackgroundImage additionalClassNames="bg-[#4154a3] rounded-[14px]">
                        <ContainerBackgroundImage3 additionalClassNames="bg-[rgba(255,255,255,0.15)] size-[36px]">
                          <IconBackgroundImage3>
                            <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d={svgPaths.p3694d280} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d={svgPaths.p1f197700} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d={svgPaths.p3bf3e100} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          </IconBackgroundImage3>
                        </ContainerBackgroundImage3>
                        <ContainerBackgroundImage2 additionalClassNames="flex-[176_0_0] h-[36.5px]">
                          <div className="content-stretch flex h-[20px] items-center relative shrink-0 w-full" data-name="Container">
                            <div className="h-[20px] relative shrink-0 w-[123.844px]" data-name="Paragraph">
                              <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                                <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[14px] text-white top-0 tracking-[-0.1504px] whitespace-nowrap">{`Team & Signatures`}</p>
                              </div>
                            </div>
                          </div>
                          <div className="h-[16.5px] opacity-70 overflow-clip relative shrink-0 w-full" data-name="Paragraph">
                            <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[11px] text-white top-0 tracking-[0.0645px] whitespace-nowrap">Manage team, copy HTML</p>
                          </div>
                        </ContainerBackgroundImage2>
                      </BackgroundImage>
                      <ButtonBackgroundImage1>
                        <ContainerBackgroundImage3 additionalClassNames="bg-[rgba(107,125,196,0.07)] size-[36px]">
                          <IconBackgroundImage3>
                            <path d={svgPaths.p594ce00} id="Vector" stroke="var(--stroke-0, #6B7DC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d="M6 13.3333H10" id="Vector_2" stroke="var(--stroke-0, #6B7DC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d="M8 2.66667V13.3333" id="Vector_3" stroke="var(--stroke-0, #6B7DC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          </IconBackgroundImage3>
                        </ContainerBackgroundImage3>
                        <ContainerBackgroundImage2 additionalClassNames="flex-[174_0_0] h-[36.5px]">
                          <div className="content-stretch flex h-[20px] items-center relative shrink-0 w-full" data-name="Container">
                            <ParagraphBackgroundImageAndText1 text="Copy Library" additionalClassNames="w-[84.328px]" />
                          </div>
                          <ParagraphBackgroundImageAndText2 text="All approved copy" />
                        </ContainerBackgroundImage2>
                      </ButtonBackgroundImage1>
                    </div>
                  </div>
                  <div className="bg-white flex-[1_0_0] h-[594.5px] min-h-px min-w-px relative rounded-[14px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[#d5dae5] border-solid inset-0 pointer-events-none rounded-[14px]" />
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start pb-px pt-[33px] px-[33px] relative size-full">
                      <div className="content-stretch flex gap-[12px] h-[61px] items-center pb-px relative shrink-0 w-full" data-name="Container">
                        <div aria-hidden="true" className="absolute border-[#e8ecf2] border-b border-solid inset-0 pointer-events-none" />
                        <ContainerBackgroundImage3 additionalClassNames="bg-[rgba(54,71,137,0.07)] size-[40px]">
                          <IconBackgroundImage1>
                            <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, #364789)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d={svgPaths.p2c4f400} id="Vector_2" stroke="var(--stroke-0, #364789)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d={svgPaths.p2241fff0} id="Vector_3" stroke="var(--stroke-0, #364789)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d={svgPaths.pae3c380} id="Vector_4" stroke="var(--stroke-0, #364789)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </IconBackgroundImage1>
                        </ContainerBackgroundImage3>
                        <BackgroundImage5 additionalClassNames="h-[40px] w-[148.016px]">
                          <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
                            <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#1b2544] text-[16px] top-0 tracking-[-0.3125px] whitespace-nowrap">{`Team & Signatures`}</p>
                          </div>
                          <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#7b8aad] text-[12px] whitespace-nowrap">Manage team, copy HTML</p>
                          </div>
                        </BackgroundImage5>
                      </div>
                      <div className="content-stretch flex flex-col gap-[16px] h-[443.5px] items-start relative shrink-0 w-full" data-name="TeamRosterManager">
                        <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
                          <div className="absolute h-[16.5px] left-0 top-[1.75px] w-[115.656px]" data-name="SectionLabel">
                            <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#9ba8c2] text-[11px] top-0 tracking-[0.6145px] whitespace-nowrap">TEAM MEMBERS (3)</p>
                          </div>
                          <div className="absolute content-stretch flex gap-[8px] h-[28px] items-start left-[652px] top-0 w-[185px]" data-name="Container">
                            <div className="bg-[rgba(65,84,163,0.08)] flex-[1_0_0] h-[28px] min-h-px min-w-px relative rounded-[8px]" data-name="CopyBtn">
                              <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                                <IconBackgroundImage />
                                <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[68px] not-italic text-[#4154a3] text-[12px] text-center top-[6px] whitespace-nowrap">Copy All Sigs</p>
                              </div>
                            </div>
                            <BackgroundImage4 additionalClassNames="bg-[#f0f2f7] rounded-[8px] w-[59.016px]">
                              <IconBackgroundImage2 additionalClassNames="left-[10px] top-[8px]">
                                <path d="M2.5 6H9.5" id="Vector" stroke="var(--stroke-0, #4154A3)" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 2.5V9.5" id="Vector_2" stroke="var(--stroke-0, #4154A3)" strokeLinecap="round" strokeLinejoin="round" />
                              </IconBackgroundImage2>
                              <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[38.5px] not-italic text-[#4154a3] text-[12px] text-center top-[6px] whitespace-nowrap">{` Add`}</p>
                            </BackgroundImage4>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col gap-[8px] h-[399.5px] items-start relative shrink-0 w-full" data-name="Container">
                          <div className="h-[258.5px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
                            <div className="overflow-clip relative rounded-[inherit] size-full">
                              <div className="absolute bg-[#f0f2f7] content-stretch flex gap-[12px] h-[56px] items-center left-px px-[16px] top-px w-[835px]" data-name="Container">
                                <ContainerBackgroundImageAndText text="NP" />
                                <div className="flex-[610.672_0_0] h-[27px] min-h-px min-w-px relative" data-name="Container">
                                  <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                                    <TextInputBackgroundImage additionalClassNames="left-0">Nirmal Prince J</TextInputBackgroundImage>
                                    <TextInputBackgroundImage additionalClassNames="left-[206.22px]">{`Founder & CEO`}</TextInputBackgroundImage>
                                    <div className="absolute bg-white content-stretch flex flex-col h-[27px] items-start left-[412.44px] pb-px pl-[-1114.438px] pr-[1312.656px] pt-[-373.5px] rounded-[4px] top-0 w-[198.219px]" data-name="Dropdown">
                                      <div aria-hidden="true" className="absolute border border-[#d5dae5] border-solid inset-0 pointer-events-none rounded-[4px]" />
                                      <div className="h-0 shrink-0 w-full" data-name="Option" />
                                      <div className="h-0 shrink-0 w-full" data-name="Option" />
                                      <div className="h-0 shrink-0 w-full" data-name="Option" />
                                      <div className="h-0 shrink-0 w-full" data-name="Option" />
                                      <div className="h-0 shrink-0 w-full" data-name="Option" />
                                      <div className="h-0 shrink-0 w-full" data-name="Option" />
                                      <div className="h-0 shrink-0 w-full" data-name="Option" />
                                      <div className="h-0 shrink-0 w-full" data-name="Option" />
                                    </div>
                                  </div>
                                </div>
                                <BackgroundImage2>
                                  <BackgroundImage3>
                                    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                                      <VectorBackgroundImage1>
                                        <path d="M0.583333 0.583333H5.83333" id="Vector" stroke="var(--stroke-0, #4154A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                      </VectorBackgroundImage1>
                                      <VectorBackgroundImage2>
                                        <path d={svgPaths.p9a58400} id="Vector" stroke="var(--stroke-0, #4154A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                      </VectorBackgroundImage2>
                                    </div>
                                  </BackgroundImage3>
                                  <CopyBtnBackgroundImageAndText text="HTML" />
                                  <ButtonBackgroundImage />
                                </BackgroundImage2>
                              </div>
                              <div className="absolute bg-white content-stretch flex flex-col h-[180.5px] items-start left-[17px] pb-px pl-[17px] pr-[412.25px] pt-[17px] rounded-[10px] top-[65px] w-[803px]" data-name="Container">
                                <div aria-hidden="true" className="absolute border border-[#d5dae5] border-solid inset-0 pointer-events-none rounded-[10px]" />
                                <div className="h-[146.5px] relative shrink-0 w-full" data-name="Table">
                                  <div className="absolute h-[146.5px] left-0 top-0 w-[373.75px]" data-name="Table Body">
                                    <div className="absolute h-[146.5px] left-0 top-0 w-[373.75px]" data-name="Table Row">
                                      <div className="absolute h-[146.5px] left-0 top-0 w-[64px]" data-name="Table Cell">
                                        <div className="absolute left-0 size-[48px] top-0" data-name="Image (IntegrateWise)" />
                                      </div>
                                      <div className="absolute h-[146.5px] left-[64px] top-0 w-[309.75px]" data-name="Table Cell">
                                        <div className="absolute h-[22.5px] left-0 top-0 w-[309.75px]" data-name="Paragraph">
                                          <p className="absolute font-['Arial:Bold',sans-serif] leading-[22.5px] left-0 not-italic text-[#1b2544] text-[15px] top-0 whitespace-nowrap">Nirmal Prince J</p>
                                        </div>
                                        <div className="absolute h-[18px] left-0 top-[24.5px] w-[309.75px]" data-name="Paragraph">
                                          <p className="absolute font-['Arial:Regular',sans-serif] leading-[18px] left-0 not-italic text-[#5f6e93] text-[12px] top-0 whitespace-nowrap">{`Founder & CEO`}</p>
                                        </div>
                                        <div className="absolute h-[19.5px] left-0 top-[50.5px] w-[309.75px]" data-name="Paragraph">
                                          <p className="absolute font-['Arial:Regular',sans-serif] leading-[19.5px] left-0 not-italic text-[#2f3d5e] text-[13px] top-0 whitespace-nowrap">IntegrateWise LLP</p>
                                        </div>
                                        <BackgroundImageAndText text="Knowledge Workspace Empowered by AI and the Spine" additionalClassNames="left-0 top-[72px] w-[309.75px]" />
                                        <div className="absolute h-[16.5px] left-0 top-[96.5px] w-[309.75px]" data-name="Table">
                                          <div className="absolute h-[16.5px] left-0 top-0 w-[309.75px]" data-name="Table Body">
                                            <div className="absolute h-[16.5px] left-0 top-0 w-[309.75px]" data-name="Table Row">
                                              <TableCellBackgroundImageAndText text="connect@integratewise.co" additionalClassNames="left-0 w-[141.188px]" />
                                              <TableCellBackgroundImageAndText text="integratewise.ai" additionalClassNames="left-[141.19px] w-[88.438px]" />
                                              <BackgroundImageAndText text="Bengaluru, India" additionalClassNames="left-[229.63px] top-0 w-[80.125px]" />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="absolute border-[#4154a3] border-solid border-t h-[25.5px] left-0 top-[121px] w-[309.75px]" data-name="Paragraph">
                                          <p className="absolute font-['Arial:Italic',sans-serif] italic leading-[16.5px] left-0 text-[#9ba8c2] text-[11px] top-[8px] whitespace-nowrap">AI Thinks in Context — and Waits for Approval</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div aria-hidden="true" className="absolute border border-[#e8ecf2] border-solid inset-0 pointer-events-none rounded-[10px]" />
                          </div>
                          <ContainerBackgroundImage1>
                            <BackgroundImage additionalClassNames="bg-white">
                              <ContainerBackgroundImageAndText text="TM" />
                              <ContainerBackgroundImage2 additionalClassNames="flex-[610.672_0_0] h-[36.5px]">
                                <ParagraphBackgroundImageAndText3 text="Team Member" />
                                <ParagraphBackgroundImageAndText text="Head of Product · connect@integratewise.co" />
                              </ContainerBackgroundImage2>
                              <ContainerBackgroundImage />
                            </BackgroundImage>
                          </ContainerBackgroundImage1>
                          <ContainerBackgroundImage1>
                            <BackgroundImage additionalClassNames="bg-white">
                              <ContainerBackgroundImageAndText text="TM" />
                              <ContainerBackgroundImage2 additionalClassNames="flex-[610.672_0_0] h-[36.5px]">
                                <ParagraphBackgroundImageAndText3 text="Team Member" />
                                <ParagraphBackgroundImageAndText text="Head of Engineering · connect@integratewise.co" />
                              </ContainerBackgroundImage2>
                              <ContainerBackgroundImage />
                            </BackgroundImage>
                          </ContainerBackgroundImage1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerBackgroundImage2>
    </div>
  );
}