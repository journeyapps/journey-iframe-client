## journey-iframe-client

Example usage (so far):

```javascript
import { JourneyIFrameClient } from 'journey-iframe-client';

document.addEventListener('DOMContentLoaded', () => {
  let j = new JourneyIFrameClient();
  document
    .getElementById('message_button')
    .addEventListener('click', async function(e) {
      let response = await j.post('message');
      console.log(response);
    });
});
```