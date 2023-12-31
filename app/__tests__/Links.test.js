import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import axios from 'axios'
import Links from '../../components/Links'

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // props contains things like src, width, height, etc.
    return <img {...props} /> // eslint-disable-line
  },
}))

jest.mock('@dnd-kit/core', () => ({
  ...jest.requireActual('@dnd-kit/core'),
  useSensors: jest.fn(),
  useSensor: jest.fn(),
  KeyboardSensor: jest.fn(),
  PointerSensor: jest.fn(),
  DndContext: jest.fn().mockImplementation(({ children }) => children),
}))

describe('Links Component', () => {
  const mockProfile = {
    links: [
      {
        id: 'link123',
        platform: 'TestPlatform',
        url: 'http://test.com',
        createdAt: new Date(),
        userId: 'user123',
      },
    ],
    id: 'user123',
    platform: 'TestPlatform',
    url: 'http://test.com',
    createdAt: new Date(),
    userId: 'user123',
    username: 'testuser',
    firstname: 'Test',
    lastname: 'User',
    email: 'test@example.com',
    profileImage: 'http://example.com/image.jpg',
    updatedAt: new Date(),
  }

  beforeEach(() => {
    // Set up the default implementation for axios.get and axios.post
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          links: [
            {
              id: 'link123',
              platform: 'TestPlatform',
              url: 'http://test.com',
              createdAt: new Date(),
              userId: 'user123',
            },
          ],
        },
      })
    )
    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: {
          link: {
            id: 'link123',
            platform: 'TestPlatform',
            url: 'http://test.com',
            createdAt: new Date(),
            userId: 'user123',
          },
        },
      })
    )
  })

  it('adds a new link block when add link button is clicked', async () => {
    render(
      <Links profile={mockProfile} setProfile={() => {}} isLoading={false} />
    )

    // If there are multiple elements, use getAllByText and select the appropriate one
    const addLinkButtons = screen.getAllByText(/add link/i)
    fireEvent.click(addLinkButtons[0]) // Modify this to select the correct button

    // Since state updates might be asynchronous, use waitFor to check the result
    await waitFor(() => {
      expect(screen.getAllByTestId('edit-link-block')).toHaveLength(1)
    })
  })

  // test drag and drop functionality - not currently working, need to investigate further
  /*test('drag and drop reorders links', async () => {
    // Render the Links component with the necessary props
    render(
      <Links profile={mockProfile} setProfile={() => {}} isLoading={false} />
    )
    screen.debug()

    // Get the draggable elements (you might need to adjust this selector based on your implementation)
    const dragHandles = await screen.findAllByTestId('drag-handle')

    fireEvent.mouseDown(dragHandles[0])
    fireEvent.mouseMove(dragHandles[1])
    fireEvent.mouseUp(dragHandles[1])
  })*/

  // manual tests show this functionality is working, but automated test FAILS
  it('removes link block when remove button is clicked', async () => {
    render(
      <Links profile={mockProfile} setProfile={() => {}} isLoading={false} />
    )

    let initialLinkBlocks = await screen.findAllByTestId('edit-link-block')

    const removeButtons = screen.getAllByText(/remove/i)

    fireEvent.click(removeButtons[0])

    // Check the result
    await waitFor(() => {
      expect(screen.queryAllByTestId('edit-link-block')).toHaveLength(
        initialLinkBlocks.length - 1
      )
    })
  })

  it('updates link block when save button is clicked', async () => {
    // Mock the server response
    axios.post.mockResolvedValueOnce({ data: { success: true } })

    render(
      <Links profile={mockProfile} setProfile={() => {}} isLoading={false} />
    )

    // Find the input field for the URL and the save button
    const linkInput = screen.getByTestId('url-input')
    const saveButton = screen.getByRole('button', { name: /save/i })

    // Simulate user typing a new link into the input field and clicking the save button
    fireEvent.change(linkInput, { target: { value: 'http://newlink.com' } })
    fireEvent.click(saveButton)

    // Check if axios.post was called with the correct data
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/links', {
        links: expect.arrayContaining([
          expect.objectContaining({ url: 'http://newlink.com' }),
        ]),
      })
    })
  })
})
