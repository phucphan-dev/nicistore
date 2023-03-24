import { MenuItem } from 'components/organisms/Menu';
import { ProductCategoryData } from 'services/product/types';

function mapModifiers(
  baseClassName: string,
  ...modifiers: (string | string[] | false | undefined)[]
): string {
  return modifiers
    .reduce<string[]>(
      (acc, m) => (!m ? acc : [...acc, ...(typeof m === 'string' ? [m] : m)]),
      [],
    )
    .map((m) => `-${m}`)
    .reduce<string>(
      (classNames, suffix) => `${classNames} ${baseClassName}${suffix}`,
      baseClassName,
    );
}

export default mapModifiers;

/*!
 * Scroll down to next block element
 */
export function scrollDownNextSection(ref: React.RefObject<HTMLDivElement>) {
  if (ref && ref.current) {
    window.scrollTo(
      { behavior: 'smooth', top: ref.current.offsetTop - 68 },
    ); // Minus header height
  }
}

/*!
 * getMousePosition(event) - cross browser normalizing of:
 * clientX, clientY, screenX, screenY, offsetX, offsetY, pageX, pageY
 * HTMLElement
 */
export function getMousePosition(
  evt:
    | React.MouseEvent<SVGPathElement, MouseEvent>
    | React.MouseEvent<SVGRectElement, MouseEvent>,
  item: HTMLDivElement,
) {
  let { pageX } = evt;
  let { pageY } = evt;
  if (pageX === undefined) {
    pageX = evt.clientX
      + document.body.scrollLeft
      + document.documentElement.scrollLeft;
    pageY = evt.clientY
      + document.body.scrollTop
      + document.documentElement.scrollTop;
  }

  const rect = item.getBoundingClientRect();
  const offsetX = evt.clientX - rect.left;
  const offsetY = evt.clientY - rect.top;

  return {
    client: { x: evt.clientX, y: evt.clientY }, // relative to the viewport
    screen: { x: evt.screenX, y: evt.screenY }, // relative to the physical screen
    offset: { x: offsetX, y: offsetY }, // relative to the event target
    page: { x: pageX, y: pageY }, // relative to the html document
  };
}

export function getDimensions(ele: HTMLDivElement) {
  const { height } = ele.getBoundingClientRect();
  const { offsetTop } = ele;
  const offsetBottom = offsetTop + height;

  return {
    height,
    offsetTop,
    offsetBottom,
  };
}

export function scrollStop(callback: (value: any) => void, time = 2000) {
  // Make sure a valid callback was provided
  if (!callback || typeof callback !== 'function') return;

  // Setup scrolling variable
  let isScrolling: any;

  // Listen for scroll events
  window.addEventListener(
    'scroll',
    () => {
      // Clear our timeout throughout the scroll
      window.clearTimeout(isScrolling);

      // Set a timeout to run after scrolling ends
      isScrolling = setTimeout(callback, time);
    },
    false,
  );
}

export const handleScrollCenter = (
  ref: React.RefObject<HTMLDivElement | null>,
  classNameEleActive: string
) => {
  const eleScroll = ref.current;
  const eleActive = document.querySelector(classNameEleActive);
  if (!eleActive || !eleScroll) return;
  // get width element scroll
  const widthEleScroll = eleScroll.getBoundingClientRect().width;
  // get distance element scroll compared to y window
  const xEleScroll = eleScroll.getBoundingClientRect().x;
  // get width element active
  const widthEleActive = eleActive.getBoundingClientRect().width;
  // get distance element active compared to y window
  const xEleActive = eleActive.getBoundingClientRect().x;
  // get position sroll bar
  const positionScroll = eleScroll.scrollLeft;
  const scrollX = xEleActive - xEleScroll
    + widthEleActive / 2 + positionScroll - widthEleScroll / 2;
  eleScroll.scroll({
    left: scrollX,
    behavior: 'smooth',
  });
};

export const renderPrice = (val?: number, isPrice?: boolean, prefix?: string) => {
  const converted = val?.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  if (prefix) return `${converted} ${prefix}`;
  if (isPrice) return converted;
  return val;
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const groupMenusFromCategories = (menus?: ProductCategoryData[]) => {
  if (!menus) {
    return [];
  }
  const recursiveMenus = (
    menuList: ProductCategoryData[],
    parentId: number,
  ): MenuItem[] => {
    const menusGrouped: MenuItem[] = [];
    menuList.forEach((menu) => {
      if (menu.parentId === parentId) {
        const subMenus = recursiveMenus(menuList, menu.id);
        menusGrouped.push(
          subMenus.length > 0
            ? {
              id: menu.id.toString(),
              text: menu.name,
              link: menu.slug,
              childrens: subMenus,
            }
            : {
              id: menu.id.toString(),
              text: menu.name,
              link: menu.slug,
            },
        );
      }
    });
    return menusGrouped;
  };
  if (menus.length > 0) {
    const firstLevelParentId = menus.find((menu) => !menu.parentId)!.parentId;
    return recursiveMenus(menus, firstLevelParentId);
  }
  return [];
};

export const getDayString = (date: Date) => `${date.getDate() < 10
  ? `0${date.getDate().toString()}` : date.getDate().toString()}/${date.getMonth() + 1 < 10
    ? `0${(date.getMonth() + 1).toString()}` : (date.getMonth() + 1)}/${date.getFullYear()} ${date.getHours() < 10
      ? `0${date.getHours().toString()}` : date.getHours().toString()}:${date.getMinutes() < 10
        ? `0${date.getMinutes().toString()}` : date.getMinutes().toString()}:${date.getSeconds() < 10
          ? `0${date.getSeconds().toString()}` : date.getSeconds().toString()}`;
