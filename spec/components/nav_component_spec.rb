require "rails_helper"

RSpec.describe Lookbook::Nav::Component, type: :component do
  it "renders the component" do
    render_inline(described_class.new(collection: Lookbook::Collection.new))

    expect(page).to have_css("[data-component=nav]")
  end
end
