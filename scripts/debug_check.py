with open('articles.html', 'r', encoding='utf-8', errors='replace') as f:
    c = f.read()
print('h-80vh found:', 'h-80vh' in c)
print('div.breadcrumbs found:', 'class="breadcrumbs"' in c)
print('pt-24 found:', 'class="pt-24"' in c)
print('has-hero-first found:', 'has-hero-first' in c)
# Show positions
bc = c.find('class="breadcrumbs"')
hv = c.find('h-80vh')
print(f'breadcrumbs pos={bc}, h-80vh pos={hv}')
