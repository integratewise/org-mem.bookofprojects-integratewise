import clsx from "clsx";
import svgPaths from "./svg-1apjlv4mhj";
type ContainerBackgroundImage1Props = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImage1Props>) {
  return (
    <div className={clsx("relative rounded-[10px] shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10px] relative size-full">{children}</div>
    </div>
  );
}
type IconBackgroundImage2Props = {
  additionalClassNames?: string;
};

function IconBackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<IconBackgroundImage2Props>) {
  return (
    <div className={clsx("absolute size-[14px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        {children}
      </svg>
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
type ContainerBackgroundImageProps = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImageProps>) {
  return <BackgroundImage6 additionalClassNames={clsx("min-h-px min-w-px relative", additionalClassNames)}>{children}</BackgroundImage6>;
}

function BackgroundImage4({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[20px] relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">{children}</div>
    </div>
  );
}
type BackgroundImage3Props = {
  additionalClassNames?: string;
};

function BackgroundImage3({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage3Props>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 8">
        {children}
      </svg>
    </div>
  );
}

function BackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}
type Icon16VectorBackgroundImage3Props = {
  additionalClassNames?: string;
};

function Icon16VectorBackgroundImage3({ children, additionalClassNames = "" }: React.PropsWithChildren<Icon16VectorBackgroundImage3Props>) {
  return (
    <div className={clsx("absolute left-1/2 right-1/2", additionalClassNames)}>
      <div className="absolute inset-[0_-0.38px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.75 55">
          {children}
        </svg>
      </div>
    </div>
  );
}
type Icon16VectorBackgroundImage2Props = {
  additionalClassNames?: string;
};

function Icon16VectorBackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<Icon16VectorBackgroundImage2Props>) {
  return (
    <div className={clsx("absolute bottom-1/2 top-1/2", additionalClassNames)}>
      <div className="absolute inset-[-0.38px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 0.75">
          {children}
        </svg>
      </div>
    </div>
  );
}
type BackgroundImage1Props = {
  additionalClassNames?: string;
};

function BackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage1Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="absolute inset-[-0.84%_-0.21%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80.3354 40.6708">
          {children}
        </svg>
      </div>
    </div>
  );
}
type BackgroundImageProps = {
  additionalClassNames?: string;
};

function BackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImageProps>) {
  return <BackgroundImage1 additionalClassNames={clsx("absolute bottom-1/2 top-[21.43%]", additionalClassNames)}>{children}</BackgroundImage1>;
}
type Icon16VectorBackgroundImage1Props = {
  additionalClassNames?: string;
};

function Icon16VectorBackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<Icon16VectorBackgroundImage1Props>) {
  return <BackgroundImage1 additionalClassNames={clsx("absolute bottom-[21.43%] top-1/2", additionalClassNames)}>{children}</BackgroundImage1>;
}

function ButtonBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-white h-[62.5px] relative rounded-[14px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#d5dae5] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[17px] py-px relative size-full">{children}</div>
      </div>
    </div>
  );
}

function IconBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
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

function IconBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage2>
      <g id="Icon">{children}</g>
    </BackgroundImage2>
  );
}
type Icon16VectorBackgroundImageProps = {
  additionalClassNames?: string;
};

function Icon16VectorBackgroundImage({ additionalClassNames = "" }: Icon16VectorBackgroundImageProps) {
  return (
    <BackgroundImage3 additionalClassNames={additionalClassNames}>
      <path d={svgPaths.p33565680} fill="var(--fill-0, white)" id="Vector" opacity="0.25" />
    </BackgroundImage3>
  );
}
type ButtonBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ButtonBackgroundImageAndText({ text, additionalClassNames = "" }: ButtonBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute bg-[#f0f2f7] content-stretch flex h-[28px] items-start px-[12px] py-[6px] rounded-[8px] top-0", additionalClassNames)}>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#5f6e93] text-[12px] text-center whitespace-nowrap">{text}</p>
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
    <BackgroundImage4 additionalClassNames={additionalClassNames}>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#5f6e93] text-[14px] top-0 tracking-[-0.1504px] whitespace-nowrap">{text}</p>
    </BackgroundImage4>
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
                  <IconBackgroundImage>
                    <path d={svgPaths.p275d2400} id="Vector" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d={svgPaths.p21a7e80} id="Vector_2" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </IconBackgroundImage>
                  <NavLinkBackgroundImageAndText text="Overview" additionalClassNames="w-[60.203px]" />
                </LinkBackgroundImage>
                <LinkBackgroundImage additionalClassNames="bg-[#4154a3]">
                  <IconBackgroundImage>
                    <path d={svgPaths.p3a2fa580} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </IconBackgroundImage>
                  <div className="h-[20px] relative shrink-0 w-[112.859px]" data-name="NavLink">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-white top-0 tracking-[-0.1504px] whitespace-nowrap">Quick Generators</p>
                    </div>
                  </div>
                </LinkBackgroundImage>
                <LinkBackgroundImage>
                  <BackgroundImage2>
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
                  </BackgroundImage2>
                  <NavLinkBackgroundImageAndText text="Brand Assets" additionalClassNames="w-[85.266px]" />
                </LinkBackgroundImage>
                <LinkBackgroundImage>
                  <IconBackgroundImage>
                    <path d={svgPaths.p37a07900} id="Vector" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d={svgPaths.p328d7880} id="Vector_2" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d="M5.83333 14.1667H5.84167" id="Vector_3" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d={svgPaths.p30b5e000} id="Vector_4" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </IconBackgroundImage>
                  <NavLinkBackgroundImageAndText text="Design Tokens" additionalClassNames="w-[94.172px]" />
                </LinkBackgroundImage>
                <LinkBackgroundImage>
                  <IconBackgroundImage>
                    <path d="M4.16667 18.3333H15.8333" id="Vector" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d={svgPaths.p2a47df00} id="Vector_2" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d={svgPaths.p36e14b60} id="Vector_3" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </IconBackgroundImage>
                  <NavLinkBackgroundImageAndText text="Stationery" additionalClassNames="w-[66.219px]" />
                </LinkBackgroundImage>
                <LinkBackgroundImage>
                  <IconBackgroundImage>
                    <path d={svgPaths.p3df93000} id="Vector" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    <path d={svgPaths.p176f31c0} id="Vector_2" stroke="var(--stroke-0, #7B8AAD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </IconBackgroundImage>
                  <NavLinkBackgroundImageAndText text="Marketing" additionalClassNames="w-[64.453px]" />
                </LinkBackgroundImage>
                <LinkBackgroundImage>
                  <BackgroundImage2>
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
                  </BackgroundImage2>
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
      <ContainerBackgroundImage additionalClassNames="flex-[1263_0_0] h-[895px]">
        <div className="bg-white h-[64px] relative shrink-0 w-[1263px]" data-name="Header">
          <div aria-hidden="true" className="absolute border-[#d5dae5] border-b border-solid inset-0 pointer-events-none" />
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-px pl-[24px] relative size-full">
            <div className="h-[28px] relative shrink-0 w-[146.922px]" data-name="Heading 1">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#1b2544] text-[18px] top-0 tracking-[-0.4395px] whitespace-nowrap">Quick Generators</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[831_0_0] min-h-px min-w-px relative w-[1263px]" data-name="Main Content">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
            <div className="h-[525.375px] relative shrink-0 w-full" data-name="GeneratorsPage">
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
                    <IconBackgroundImage2 additionalClassNames="left-[12px] top-[9px]">
                      <g clipPath="url(#clip0_75_550)" id="Icon">
                        <path d={svgPaths.pc012c00} id="Vector" stroke="var(--stroke-0, #5F6E93)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                        <path d="M7 3.5V7L9.33333 8.16667" id="Vector_2" stroke="var(--stroke-0, #5F6E93)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                      </g>
                      <defs>
                        <clipPath id="clip0_75_550">
                          <rect fill="white" height="14" width="14" />
                        </clipPath>
                      </defs>
                    </IconBackgroundImage2>
                    <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[75.5px] not-italic text-[#5f6e93] text-[12px] text-center top-[8px] whitespace-nowrap">Export Log (1)</p>
                    <div className="absolute left-[123.09px] size-[12px] top-[10px]" data-name="Icon">
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                        <g id="Icon">
                          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #5F6E93)" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[24px] h-[353.375px] items-start relative shrink-0 w-full" data-name="Container">
                  <div className="h-[353.375px] relative shrink-0 w-[256px]" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
                      <ButtonBackgroundImage>
                        <ContainerBackgroundImage1 additionalClassNames="bg-[rgba(235,67,121,0.07)] size-[36px]">
                          <IconBackgroundImage1>
                            <path d={svgPaths.p18993c00} id="Vector" stroke="var(--stroke-0, #EB4379)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d="M8 14.6667V8" id="Vector_2" stroke="var(--stroke-0, #EB4379)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d={svgPaths.p14df0fc0} id="Vector_3" stroke="var(--stroke-0, #EB4379)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d="M5 2.84667L11 6.28" id="Vector_4" stroke="var(--stroke-0, #EB4379)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          </IconBackgroundImage1>
                        </ContainerBackgroundImage1>
                        <ContainerBackgroundImage additionalClassNames="flex-[174_0_0] h-[36.5px]">
                          <div className="content-stretch flex gap-[6px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
                            <ParagraphBackgroundImageAndText1 text="Campaign Kit" additionalClassNames="w-[88.297px]" />
                            <div className="bg-[#eb4379] h-[17.5px] relative rounded-[33554400px] shrink-0 w-[34.109px]" data-name="Text">
                              <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                                <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[13.5px] left-[6px] not-italic text-[9px] text-white top-[2px] tracking-[0.167px] whitespace-nowrap">NEW</p>
                              </div>
                            </div>
                          </div>
                          <ParagraphBackgroundImageAndText2 text="One-click full export" />
                        </ContainerBackgroundImage>
                      </ButtonBackgroundImage>
                      <div className="bg-[#4154a3] h-[60.5px] relative rounded-[14px] shrink-0 w-full" data-name="Button">
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[12px] items-center px-[16px] relative size-full">
                            <ContainerBackgroundImage1 additionalClassNames="bg-[rgba(255,255,255,0.15)] size-[36px]">
                              <IconBackgroundImage1>
                                <path d={svgPaths.p14dc0c00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                <path d="M4 6H1.33333V14H4V6Z" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                                <path d={svgPaths.p342eb800} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                              </IconBackgroundImage1>
                            </ContainerBackgroundImage1>
                            <ContainerBackgroundImage additionalClassNames="flex-[176_0_0] h-[36.5px]">
                              <div className="content-stretch flex h-[20px] items-center relative shrink-0 w-full" data-name="Container">
                                <BackgroundImage4 additionalClassNames="w-[113.406px]">
                                  <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[14px] text-white top-0 tracking-[-0.1504px] whitespace-nowrap">LinkedIn Banners</p>
                                </BackgroundImage4>
                              </div>
                              <div className="h-[16.5px] opacity-70 overflow-clip relative shrink-0 w-full" data-name="Paragraph">
                                <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[11px] text-white top-0 tracking-[0.0645px] whitespace-nowrap">1584x396, 4 styles</p>
                              </div>
                            </ContainerBackgroundImage>
                          </div>
                        </div>
                      </div>
                      <ButtonBackgroundImage>
                        <ContainerBackgroundImage1 additionalClassNames="bg-[rgba(65,84,163,0.07)] size-[36px]">
                          <IconBackgroundImage1>
                            <path d={svgPaths.p19d57600} id="Vector" stroke="var(--stroke-0, #4154A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d={svgPaths.p2fe1fe40} id="Vector_2" stroke="var(--stroke-0, #4154A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d={svgPaths.p2c494540} id="Vector_3" stroke="var(--stroke-0, #4154A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          </IconBackgroundImage1>
                        </ContainerBackgroundImage1>
                        <ContainerBackgroundImage additionalClassNames="flex-[174_0_0] h-[36.5px]">
                          <div className="content-stretch flex h-[20px] items-center relative shrink-0 w-full" data-name="Container">
                            <ParagraphBackgroundImageAndText1 text="Social Posts" additionalClassNames="w-[80.266px]" />
                          </div>
                          <ParagraphBackgroundImageAndText2 text="Editable, all platforms" />
                        </ContainerBackgroundImage>
                      </ButtonBackgroundImage>
                      <ButtonBackgroundImage>
                        <ContainerBackgroundImage1 additionalClassNames="bg-[rgba(54,71,137,0.07)] size-[36px]">
                          <IconBackgroundImage1>
                            <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #364789)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d={svgPaths.p3694d280} id="Vector_2" stroke="var(--stroke-0, #364789)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d={svgPaths.p1f197700} id="Vector_3" stroke="var(--stroke-0, #364789)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d={svgPaths.p3bf3e100} id="Vector_4" stroke="var(--stroke-0, #364789)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          </IconBackgroundImage1>
                        </ContainerBackgroundImage1>
                        <ContainerBackgroundImage additionalClassNames="flex-[174_0_0] h-[36.5px]">
                          <div className="content-stretch flex h-[20px] items-center relative shrink-0 w-full" data-name="Container">
                            <BackgroundImage4 additionalClassNames="w-[123.844px]">
                              <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#5f6e93] text-[14px] top-0 tracking-[-0.1504px] whitespace-nowrap">{`Team & Signatures`}</p>
                            </BackgroundImage4>
                          </div>
                          <ParagraphBackgroundImageAndText2 text="Manage team, copy HTML" />
                        </ContainerBackgroundImage>
                      </ButtonBackgroundImage>
                      <ButtonBackgroundImage>
                        <ContainerBackgroundImage1 additionalClassNames="bg-[rgba(107,125,196,0.07)] size-[36px]">
                          <IconBackgroundImage1>
                            <path d={svgPaths.p594ce00} id="Vector" stroke="var(--stroke-0, #6B7DC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d="M6 13.3333H10" id="Vector_2" stroke="var(--stroke-0, #6B7DC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                            <path d="M8 2.66667V13.3333" id="Vector_3" stroke="var(--stroke-0, #6B7DC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          </IconBackgroundImage1>
                        </ContainerBackgroundImage1>
                        <ContainerBackgroundImage additionalClassNames="flex-[174_0_0] h-[36.5px]">
                          <div className="content-stretch flex h-[20px] items-center relative shrink-0 w-full" data-name="Container">
                            <ParagraphBackgroundImageAndText1 text="Copy Library" additionalClassNames="w-[84.328px]" />
                          </div>
                          <ParagraphBackgroundImageAndText2 text="All approved copy" />
                        </ContainerBackgroundImage>
                      </ButtonBackgroundImage>
                    </div>
                  </div>
                  <div className="bg-white flex-[1_0_0] h-[353.375px] min-h-px min-w-px relative rounded-[14px]" data-name="Container">
                    <div aria-hidden="true" className="absolute border border-[#d5dae5] border-solid inset-0 pointer-events-none rounded-[14px]" />
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start pb-px pt-[33px] px-[33px] relative size-full">
                      <div className="content-stretch flex gap-[12px] h-[61px] items-center pb-px relative shrink-0 w-full" data-name="Container">
                        <div aria-hidden="true" className="absolute border-[#e8ecf2] border-b border-solid inset-0 pointer-events-none" />
                        <ContainerBackgroundImage1 additionalClassNames="bg-[rgba(10,102,194,0.07)] size-[40px]">
                          <IconBackgroundImage>
                            <path d={svgPaths.peba4c00} id="Vector" stroke="var(--stroke-0, #0A66C2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d="M5 7.5H1.66667V17.5H5V7.5Z" id="Vector_2" stroke="var(--stroke-0, #0A66C2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            <path d={svgPaths.p25677470} id="Vector_3" stroke="var(--stroke-0, #0A66C2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                          </IconBackgroundImage>
                        </ContainerBackgroundImage1>
                        <BackgroundImage5 additionalClassNames="h-[40px] w-[130.484px]">
                          <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
                            <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#1b2544] text-[16px] top-0 tracking-[-0.3125px] whitespace-nowrap">LinkedIn Banners</p>
                          </div>
                          <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
                            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#7b8aad] text-[12px]">1584x396, 4 styles</p>
                          </div>
                        </BackgroundImage5>
                      </div>
                      <div className="content-stretch flex flex-col gap-[16px] h-[202.375px] items-start relative shrink-0 w-full" data-name="LinkedInBannerGenerator">
                        <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
                          <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[6px] w-[33.047px]" data-name="Text">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#7b8aad] text-[12px] whitespace-nowrap">Style:</p>
                          </div>
                          <div className="absolute bg-[#4154a3] content-stretch flex h-[28px] items-start left-[41.05px] px-[12px] py-[6px] rounded-[8px] top-0 w-[73.891px]" data-name="Button">
                            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">Gradient</p>
                          </div>
                          <ButtonBackgroundImageAndText text="Dark" additionalClassNames="left-[122.94px] w-[51.094px]" />
                          <ButtonBackgroundImageAndText text="Light" additionalClassNames="left-[182.03px] w-[53.297px]" />
                          <ButtonBackgroundImageAndText text="Accent" additionalClassNames="left-[243.33px] w-[64.344px]" />
                        </div>
                        <div className="h-[106.375px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
                          <div className="overflow-clip rounded-[inherit] size-full">
                            <div className="content-stretch flex flex-col items-start p-px relative size-full">
                              <div className="h-[52px] relative shrink-0 w-full" data-name="Container">
                                <div className="content-stretch flex flex-col items-start pr-[43px] relative size-full">
                                  <div className="h-[198px] relative shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(165.964deg, rgb(65, 84, 163) 0%, rgb(54, 71, 137) 50%, rgb(27, 37, 68) 100%)" }}>
                                    <div className="absolute content-stretch flex flex-col items-start left-[622px] size-[280px] top-[29px]" data-name="Container">
                                      <div className="h-[140px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                                        <BackgroundImage additionalClassNames="left-[21.43%] right-1/2">
                                          <path d={svgPaths.p45a2b00} id="Vector" opacity="0.3" stroke="var(--stroke-0, white)" strokeWidth="0.75" />
                                        </BackgroundImage>
                                        <BackgroundImage additionalClassNames="left-1/2 right-[21.43%]">
                                          <path d={svgPaths.p380f4348} id="Vector" opacity="0.3" stroke="var(--stroke-0, white)" strokeWidth="0.75" />
                                        </BackgroundImage>
                                        <Icon16VectorBackgroundImage1 additionalClassNames="left-[21.43%] right-1/2">
                                          <path d={svgPaths.pe397900} id="Vector" opacity="0.3" stroke="var(--stroke-0, white)" strokeWidth="0.75" />
                                        </Icon16VectorBackgroundImage1>
                                        <Icon16VectorBackgroundImage1 additionalClassNames="left-1/2 right-[21.43%]">
                                          <path d={svgPaths.p305c5e00} id="Vector" opacity="0.3" stroke="var(--stroke-0, white)" strokeWidth="0.75" />
                                        </Icon16VectorBackgroundImage1>
                                        <Icon16VectorBackgroundImage2 additionalClassNames="left-[14.29%] right-1/2">
                                          <path d="M100 0.375H0" id="Vector" opacity="0.3" stroke="var(--stroke-0, white)" strokeWidth="0.75" />
                                        </Icon16VectorBackgroundImage2>
                                        <Icon16VectorBackgroundImage2 additionalClassNames="left-1/2 right-[14.29%]">
                                          <path d="M0 0.375H100" id="Vector" opacity="0.3" stroke="var(--stroke-0, white)" strokeWidth="0.75" />
                                        </Icon16VectorBackgroundImage2>
                                        <Icon16VectorBackgroundImage3 additionalClassNames="bottom-1/2 top-[10.71%]">
                                          <path d="M0.375 55V0" id="Vector" opacity="0.3" stroke="var(--stroke-0, white)" strokeWidth="0.75" />
                                        </Icon16VectorBackgroundImage3>
                                        <Icon16VectorBackgroundImage3 additionalClassNames="bottom-[10.71%] top-1/2">
                                          <path d="M0.375 0V55" id="Vector" opacity="0.3" stroke="var(--stroke-0, white)" strokeWidth="0.75" />
                                        </Icon16VectorBackgroundImage3>
                                        <Icon16VectorBackgroundImage additionalClassNames="inset-[18.57%_75.71%_75.71%_18.57%]" />
                                        <Icon16VectorBackgroundImage additionalClassNames="inset-[18.57%_18.57%_75.71%_75.71%]" />
                                        <Icon16VectorBackgroundImage additionalClassNames="inset-[75.71%_75.71%_18.57%_18.57%]" />
                                        <Icon16VectorBackgroundImage additionalClassNames="inset-[75.71%_18.57%_18.57%_75.71%]" />
                                        <Icon16VectorBackgroundImage additionalClassNames="inset-[47.14%_82.86%_47.14%_11.43%]" />
                                        <Icon16VectorBackgroundImage additionalClassNames="inset-[47.14%_11.43%_47.14%_82.86%]" />
                                        <Icon16VectorBackgroundImage additionalClassNames="inset-[7.86%_47.14%_86.43%_47.14%]" />
                                        <Icon16VectorBackgroundImage additionalClassNames="inset-[86.43%_47.14%_7.86%_47.14%]" />
                                        <div className="absolute inset-[32.14%]" data-name="Vector">
                                          <div className="absolute inset-[-0.5%_-0.25%]">
                                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100.5 50.5">
                                              <path d={svgPaths.p287e8800} id="Vector" opacity="0.15" stroke="var(--stroke-0, white)" strokeWidth="0.5" />
                                            </svg>
                                          </div>
                                        </div>
                                        <div className="absolute inset-[42.86%]" data-name="Vector">
                                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 20">
                                            <path d={svgPaths.p21c2a400} fill="var(--fill-0, white)" id="Vector" opacity="0.4" />
                                          </svg>
                                        </div>
                                        <BackgroundImage3 additionalClassNames="inset-[47.14%]">
                                          <path d={svgPaths.p33565680} fill="var(--fill-0, #EB4379)" id="Vector" opacity="0.9" />
                                        </BackgroundImage3>
                                      </div>
                                    </div>
                                    <div className="absolute h-[98.289px] left-[40px] top-[49.85px] w-[712px]" data-name="Container">
                                      <div className="absolute content-stretch flex h-[24px] items-center left-0 top-0 w-[712px]" data-name="Container">
                                        <div className="h-[24px] relative shrink-0 w-[50.523px]" data-name="Image">
                                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50.5234 24">
                                            <g clipPath="url(#clip0_75_508)" id="Image">
                                              <path d={svgPaths.p2c7a4680} fill="var(--fill-0, #4154A3)" id="Vector" />
                                              <path d={svgPaths.pdf11000} fill="var(--fill-0, #4154A3)" id="Vector_2" />
                                              <path d={svgPaths.p25405a40} fill="var(--fill-0, #4154A3)" id="Vector_3" />
                                              <path d={svgPaths.p21f15280} fill="var(--fill-0, #EB4379)" id="Vector_4" />
                                            </g>
                                            <defs>
                                              <clipPath id="clip0_75_508">
                                                <rect fill="white" height="24" width="50.5234" />
                                              </clipPath>
                                            </defs>
                                          </svg>
                                        </div>
                                      </div>
                                      <div className="absolute content-stretch flex h-[25.195px] items-start left-0 top-[34px] w-[712px]" data-name="Paragraph">
                                        <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[50.4px] min-h-px min-w-px not-italic relative text-[42px] text-white tracking-[-0.1309px]">IntegrateWise</p>
                                      </div>
                                      <div className="absolute h-[12.594px] left-0 top-[63.2px] w-[712px]" data-name="Paragraph">
                                        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.2px] left-0 not-italic text-[18px] text-[rgba(255,255,255,0.75)] top-0 tracking-[-0.4395px] whitespace-nowrap">Knowledge Workspace Empowered by AI and the Spine</p>
                                      </div>
                                      <div className="absolute h-[10.5px] left-0 top-[87.79px] w-[712px]" data-name="Paragraph">
                                        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-[rgba(255,255,255,0.6)] top-[-1px] tracking-[0.3496px] whitespace-nowrap">AI Thinks in Context — and Waits for Approval</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div aria-hidden="true" className="absolute border border-[#d5dae5] border-solid inset-0 pointer-events-none rounded-[14px]" />
                        </div>
                        <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
                          <div className="absolute bg-[#4154a3] h-[36px] left-0 rounded-[10px] top-0 w-[171.594px]" data-name="Button">
                            <IconBackgroundImage2 additionalClassNames="left-[16px] top-[11px]">
                              <g id="Icon">
                                <path d={svgPaths.p34aacb00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                <path d={svgPaths.p27169580} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                <path d="M7 8.75V1.75" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                              </g>
                            </IconBackgroundImage2>
                            <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[97.5px] not-italic text-[12px] text-center text-white top-[10px] whitespace-nowrap">{` Download This Style`}</p>
                          </div>
                          <div className="absolute bg-[#f0f2f7] h-[36px] left-[179.59px] rounded-[10px] top-0 w-[230.453px]" data-name="Button">
                            <IconBackgroundImage2 additionalClassNames="left-[16px] top-[11px]">
                              <g clipPath="url(#clip0_75_581)" id="Icon">
                                <path d={svgPaths.p3b016f00} id="Vector" stroke="var(--stroke-0, #4154A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                <path d={svgPaths.p23023200} id="Vector_2" stroke="var(--stroke-0, #4154A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                <path d={svgPaths.pb269580} id="Vector_3" stroke="var(--stroke-0, #4154A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                              </g>
                              <defs>
                                <clipPath id="clip0_75_581">
                                  <rect fill="white" height="14" width="14" />
                                </clipPath>
                              </defs>
                            </IconBackgroundImage2>
                            <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[126px] not-italic text-[#4154a3] text-[12px] text-center top-[10px] whitespace-nowrap">{` Batch Export All 4 Styles (.zip)`}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerBackgroundImage>
    </div>
  );
}