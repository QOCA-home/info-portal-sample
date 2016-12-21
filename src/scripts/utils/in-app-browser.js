import $ from 'jquery';
import _ from 'lodash';

const openLink = _.debounce((event)=>{
  window.open(event.currentTarget.href, event.currentTarget.target, 'location=yes');
}, 300, true);

// document.addEventListener('deviceready', ()=> {
  $(document).on('click', 'a', (event) => {
    if (event.currentTarget.target === '_blank') {
      event.preventDefault();
      openLink(event);
      return;
    }
  });
// }, false);

