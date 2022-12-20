import { render } from '@testing-library/react';
import EventsPage from './EventsPage';

const context = describe;

describe('EventsPage', () => {
  function renderEventsPage() {
    render(<EventsPage />);
  }

  it('EventsPage', () => {
    renderEventsPage();
  });
});
