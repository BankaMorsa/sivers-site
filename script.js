(function(){
  'use strict';

  var body = document.body;
  var openModal = null;

  function closeAll(){
    document.querySelectorAll('.modal.is-open').forEach(function(m){
      m.classList.remove('is-open');
    });
    body.classList.remove('modal-open');
    openModal = null;
  }

  function openById(id){
    var modal = document.getElementById('modal-' + id);
    if(!modal) return;
    closeAll();
    modal.classList.add('is-open');
    body.classList.add('modal-open');
    openModal = modal;

    var closeBtn = modal.querySelector('.modal__close');
    if(closeBtn) closeBtn.focus({preventScroll:true});

    var modalBody = modal.querySelector('.modal__body');
    if(modalBody) modalBody.scrollTop = 0;
  }

  document.querySelectorAll('.btn[data-modal]').forEach(function(btn){
    btn.addEventListener('click', function(){
      openById(btn.getAttribute('data-modal'));
    });
  });

  document.querySelectorAll('[data-close]').forEach(function(el){
    el.addEventListener('click', closeAll);
  });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && openModal) closeAll();
  });

  document.addEventListener('keydown', function(e){
    if(!openModal || e.key !== 'Tab') return;
    var focusables = openModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if(!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if(e.shiftKey && document.activeElement === first){
      e.preventDefault(); last.focus();
    } else if(!e.shiftKey && document.activeElement === last){
      e.preventDefault(); first.focus();
    }
  });

  var touchStartY = null;
  document.addEventListener('touchstart', function(e){
    if(!openModal) return;
    touchStartY = e.touches[0].clientY;
  }, {passive:true});
  document.addEventListener('touchend', function(e){
    if(!openModal || touchStartY === null) return;
    var dy = e.changedTouches[0].clientY - touchStartY;
    var modalBody = openModal.querySelector('.modal__body');
    if(modalBody && modalBody.scrollTop <= 0 && dy > 90){
      closeAll();
    }
    touchStartY = null;
  }, {passive:true});

})();