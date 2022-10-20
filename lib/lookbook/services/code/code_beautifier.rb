require "htmlbeautifier"

module Lookbook
  class CodeBeautifier < Service
    attr_reader :source, :opts

    def initialize(source, opts = {})
      @source = source.to_s
      @opts = opts
    end

    def call
      language = opts.fetch(:language, "html")
      return source unless language.downcase == "html"

      fragment = Nokogiri::HTML.fragment(source)
      html = collapse_class_lists(fragment).to_html.gsub(/\>[ ]+\</, ">\n<")
      HtmlBeautifier.beautify(html).strip.html_safe
    end

    private

    def collapse_class_lists(fragment)
      fragment.search("[class]").each do |el|
        el["class"] = el["class"].strip.squeeze(" ").gsub("\n", "")
      end
      fragment
    end
  end
end
