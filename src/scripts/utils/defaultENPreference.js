import backgroundImage from '../../images/background_en.png'; //default photo
import imgShopping4 from '../../images/qoca_video.png'; // qoca_video
import imgShopping5 from '../../images/art.png';
import imgShopping6 from '../../images/order_meal.png';

const version = 'df_20161128_en';
export default {
  backgroundImage,
  version,
  activeWidgets: [
    {
      widgetName: 'QOCA Video',
      source: 'widget-shopping',
      widgetId: 1,
      protocol: 'qoca video',
      header: 'QOCA Introduction',
      img: imgShopping4
    },
    {
      widgetName: 'Introduction Video',
      source: 'widget-shopping',
      widgetId: 2,
      protocol: 'order meal',
      header: 'Order Meal',
      img: imgShopping6
    }
    // {
    //   widgetName: 'Introduction Video',
    //   source: 'widget-shopping',
    //   widgetId: 2,
    //   header: 'Introduction Video',
    //   img: imgShopping5
    // },
  ]
};
