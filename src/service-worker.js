self.addEventListener('fetch', function(event) {
  event.respondWith(
      fetch(event.request).catch(function() {
        return self.__precacheManifest.match(event.request);
      })
  );
});