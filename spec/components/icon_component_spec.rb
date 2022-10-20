require "rails_helper"

RSpec.describe Lookbook::Icon::Component, type: :component do
  it "renders the component" do
    render_inline(described_class.new(name: :book))

    expect(page).to have_css("[data-component=icon]")
  end
end
