# @label Toolbar Button
# @display layout 'grid'
# @display cols 3
class ButtonComponentPreview < ViewComponent::Preview
  # @!group Examples

  # @display centered true
  def default
    render Lookbook::Button::Component.new icon: :book
  end

  # @label With Tooltip
  #
  # The tooltip appears when hovering over the button.
  def tooltip
    render Lookbook::Button::Component.new icon: :book, tooltip: "An example tooltip"
  end

  def disabled
    render Lookbook::Button::Component.new icon: :book, disabled: true
  end

  # @label With click handler
  def click
    render Lookbook::Button::Component.new icon: :book, "@click": "console.log('button clicked')"
  end

  def link
    render Lookbook::Button::Component.new icon: :book, href: "https://example.com"
  end

  # @!endgroup

  # @param icon (see IconComponentPreview#default)
  # @param size select [sm,md,lg]
  # @param tooltip
  def playground(icon: :book, size: :md, tooltip: "An example tooltip")
    render Lookbook::Button::Component.new icon: icon, size: size, tooltip: tooltip
  end

  def with_content
    render Lookbook::Button::Component.new icon: :book do
      tag.div "Some content within the button", class: "mt-2"
    end
  end

  def with_dropdown
    render Lookbook::Button::Component.new icon: :book do |button|
      button.dropdown do
        "<div class='p-4'>Some dropdown content</div>".html_safe
      end
    end
  end
end
