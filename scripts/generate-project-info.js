#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Paths
const packagePath = path.join(__dirname, '..', 'package.json');
const outputDir = path.join(__dirname, '..', 'src', 'configurations');
const outputPath = path.join(outputDir, 'project-info.js');

try {
  // Read package.json
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));

  // Build output object
  const output = {
    project: {
      name: pkg.name || 'unknown-project',
      version: pkg.version || '0.0.0',
    },
    framework: {
      name: 'AngularJS',
      version: (pkg.dependencies && pkg.dependencies['angular']) || 'unknown',
    },
    runtime: {
      name: 'Node.js',
      version: (pkg.engines && pkg.engines.node) || '>= 22.0.0',
    },
    dependencies: Object.entries(pkg.dependencies || {})
      .map(([name, version]) => ({
        name,
        version: version.replace(/^\^/, ''), // remove leading caret
      }))
      .sort((a, b) => a.name.localeCompare(b.name)), // optional: sort alphabetically
  };

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write CommonJS export file
  const fileContent = `module.exports = ${JSON.stringify(output, null, 2)};\n`;
  fs.writeFileSync(outputPath, fileContent, 'utf-8');

  console.log(`✅ project-info.js generated successfully at: ${outputPath}`);
} catch (error) {
  console.error('❌ Failed to generate project-info.js:', error);
  process.exit(1);
}
