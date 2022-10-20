---
layout: default
title: Using Annotations
---

Lookbook extends the standard ViewComponent preview classes using [Yard-style](https://rubydoc.info/gems/yard/file/docs/Tags.md) comment annotations in the source code.

Comment annotations can be added at the class (preview) or method (preview example) level, and can contain a mix of [text content](#notes) and [tags](#tags).

{%= note :info do %}
See the [Tags Reference](/api/tags/) page for full details of all available tags.
{% end %}


## Annotated preview file example

Below is an example of an ViewComponent preview file with annotations.

```ruby
# @label Basic Button
# @display bg_color "#fff"
class ButtonComponentPreview < ViewComponent::Preview

  # Primary button
  # ---------------
  # This is the button style you should use for most things.
  #
  # @label Primary
  def default
    render ButtonComponent.new do
      "Click me"
    end
  end

  # Button with icon
  # ----------------
  # This example uses dynamic preview parameters
  # which can be edited live in the Lookbook UI
  #
  # @param text
  # @param icon select [heart, cog, alert]
  def icon(text: "Spread the love", icon: "heart")
    render ButtonComponent.new(icon: icon) do
      text
    end
  end

  # Inverted button
  # ---------------
  # For light-on-dark screens
  #
  # @display bg_color "#000"
  def secondary
    render ButtonComponent.new(style: :inverted) do
      "Click me"
    end
  end

  # Unicorn button
  # ---------------
  # This button style is still a **work in progress**
  # and so has been hidden from the navigation.
  #
  # @hidden
  def unicorn
    render ButtonComponent.new do
      "Click me"
    end
  end

  # @!group More examples

  def short_text
    render ButtonComponent.new do
      "Go"
    end
  end

  def long_text
    render ButtonComponent.new do
      "Click here to do this thing because it's the best way to do it"
    end
  end

  def emoji_text
    render ButtonComponent.new do
      "👀📗"
    end
  end

  # @!endgroup
end
```


{{toc}}

## Tags

Tags are lines of structured text identified by their `@` prefix - for example `@hidden`. They provide extra information to Lookbook about how to render the preview or represent items in the navigation.

In the following example, the preview class has one tag applied to it (`@label`) and the example method has two (`@display` and `@param`)

```rb
# @label Basic Button
class ButtonComponentPreview < ViewComponent::Preview
  # @display bg_color red
  # @param icon select [heart, cog, alert]
  def icon(icon: "heart")
    render ButtonComponent.new(icon: icon) do
      "Spread the love"
    end
  end
```

{%= note :info do %}
The [Tags Reference](/api/tags/) page contains a **full list of all available tags**, and the other pages in this section explore some of the tags and their usage in more detail.
{% end %}

## Notes

All comment text other than tags will be treated as Markdown and rendered in the **Notes** panel for that example in the Lookbook UI.

```ruby
class ProfileCardComponentPreview < ViewComponent::Preview 

  # Profile Card
  # ------------
  # Use the default profile card component whenever you need to represent a user.
  #
  # All this text will be included in the Notes panel for the component.
  def default
  end
end
```
